import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';
import { Observable } from 'rxjs';
import { WeatherConditions } from './models/WeatherConditions';

export const LOCATIONS = 'locations';

@Injectable()
export class LocationService {
  locations: string[] = [];

  constructor(private weatherService: WeatherService) {
    const locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      this.locations = JSON.parse(locString);
    }
    for (const loc of this.locations) {
      this.weatherService.addCurrentConditions(loc);
    }
  }

  addLocation(location: string): Observable<WeatherConditions> {
    this.locations.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    return this.weatherService.addCurrentConditions(location);
  }

  removeLocation(location: string) {
    const index = this.locations.indexOf(location);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(location);
    }
  }
}
