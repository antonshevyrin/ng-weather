import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { LocationService } from '../location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {
  constructor(
    public weatherService: WeatherService,
    public locationService: LocationService,
    private router: Router
  ) {
  }

  getCurrentConditions$() {
    return this.weatherService.getCurrentConditions$();
  }

  showForecast(location: string) {
    this.router.navigate(this.getForecastCommand(location));
  }

  getForecastCommand(location: string): any[] {
    return ['/forecast', location];
  }
}
