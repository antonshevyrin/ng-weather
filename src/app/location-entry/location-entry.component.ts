import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { filter, first } from 'rxjs';
import { ObservingButtonComponent } from '../observing-button/observing-button.component';

@Component({
  selector: 'app-location-entry',
  templateUrl: './location-entry.component.html',
  styleUrls: ['./location-entry.component.css']
})
export class LocationEntryComponent {
  constructor(private service: LocationService) {
  }

  addLocation(button: ObservingButtonComponent, location: string) {
    if (!!location) {
      const firstLoadedWeatherConditions$ = this.service
        .addLocation(location)
        .pipe(
          filter((value) => value.data),
          first()
        );
      button.subscribeToObservable(firstLoadedWeatherConditions$);
    }
  }
}
