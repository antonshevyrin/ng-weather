import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { filter, first } from 'rxjs';
import { ObservingButtonComponent } from '../observing-button/observing-button.component';

@Component({
  selector: 'app-zipcode-entry',
  templateUrl: './zipcode-entry.component.html'
})
export class ZipcodeEntryComponent {
  constructor(private service: LocationService) {}

  addLocation(button: ObservingButtonComponent, zipcode: string) {
    if (!!zipcode) {
      const firstLoadedWeatherConditions$ = this.service
        .addLocation(zipcode)
        .pipe(
          filter((value) => value.data),
          first()
        );
      button.subscribeToObservable(firstLoadedWeatherConditions$);
    }
  }
}
