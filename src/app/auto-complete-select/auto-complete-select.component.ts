import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { AutoCompleteOption } from '../models/AutoCompleteOption';
import {
  fromEvent,
  map,
  mergeWith,
  Observable,
  Subject,
  takeUntil
} from 'rxjs';

@Component({
  selector: 'app-auto-complete-select',
  templateUrl: './auto-complete-select.component.html',
  styleUrls: ['./auto-complete-select.component.scss']
})
export class AutoCompleteSelectComponent implements OnInit, OnDestroy {
  @Input() placeholder = '';
  @Input() options: AutoCompleteOption[] = [];
  @Input() value: string;
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('nameInput', { static: true }) inputElementRef;

  isTooltipVisible$: Observable<boolean>;
  optionClick$: Subject<void> = new Subject<void>();

  isDestroyed$: Subject<void>;
  suggestedOptions: AutoCompleteOption[];
  name: string;

  ngOnInit() {
    this.isDestroyed$ = new Subject<void>();

    const fromInputFocus$: Observable<Event> = fromEvent(
      this.inputElementRef.nativeElement,
      'focus'
    );

    this.isTooltipVisible$ = fromInputFocus$.pipe(
      map(() => true),
      mergeWith(this.optionClick$.pipe(map(() => false))),
      takeUntil(this.isDestroyed$)
    );

    this.syncInputAndSelectionOptionValues();
  }

  syncInputAndSelectionOptionValues() {
    if (this.value) {
      const selectedOption = this.options.find(
        (option) => option.value === this.value
      );
      if (selectedOption) {
        this.name = selectedOption.value;
      } else {
        this.value = '';
        this.valueChange.emit(this.value);
      }
    }

    this.name = '';
  }

  ngOnDestroy() {
    this.isDestroyed$.next();
    this.isDestroyed$.complete();
  }

  onNameInput() {
    if (this.name.length > 1) {
      const lowerCaseValue = this.name.toLowerCase();
      this.suggestedOptions = this.options.filter((option) =>
        option.name.toLowerCase().includes(lowerCaseValue)
      );
    } else {
      this.suggestedOptions = [];
    }
  }

  onOptionClick(option: AutoCompleteOption) {
    this.name = option.name;
    this.value = option.value;
    this.valueChange.emit(this.value);
    this.optionClick$.next();
  }
}
