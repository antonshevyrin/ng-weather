import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {
  location: string;
  forecast: any;

  constructor(public weatherService: WeatherService, route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.location = params['location'];
      weatherService
        .getForecast(this.location)
        .subscribe((data) => (this.forecast = data));
    });
  }
}
