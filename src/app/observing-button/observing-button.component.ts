import { Component, Input, OnDestroy } from '@angular/core';
import { concat, delay, last, map, Observable, of, Subscription } from 'rxjs';

enum ButtonState {
  Ready,
  Busy,
  Done
}

@Component({
  selector: 'app-observing-button',
  templateUrl: './observing-button.component.html'
})
export class ObservingButtonComponent implements OnDestroy {
  @Input() postCompletionReadyDelay = 500;

  ButtonState = ButtonState;
  state: ButtonState = ButtonState.Ready;
  subscription$: Subscription;

  ngOnDestroy(): void {
    this.unsubscribeFromObservable();
  }

  unsubscribeFromObservable() {
    if (this.subscription$) {
      this.subscription$.unsubscribe();
    }
  }

  subscribeToObservable(observable$: Observable<any>) {
    if (!observable$ || this.state !== ButtonState.Ready) {
      return;
    }
    // immediately (synchronously) set state to Busy to prevent clicks
    this.state = ButtonState.Busy;
    this.unsubscribeFromObservable();
    const doneStateOnCompletion$ = observable$.pipe(
      last(),
      map(() => ButtonState.Done)
    );
    const readyStateAfterPostCompletionReadyDelay$ = of(ButtonState.Ready).pipe(
      delay(this.postCompletionReadyDelay)
    );
    this.subscription$ = concat(
      doneStateOnCompletion$,
      readyStateAfterPostCompletionReadyDelay$
    ).subscribe({
      next: (newState) => {
        this.state = newState;
      },
      error: () => {
        this.state = ButtonState.Ready;
      }
    });
  }
}
