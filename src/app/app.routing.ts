import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AppModule } from './app.module';

const appRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent
  },
  {
    path: 'forecast/:location',
    component: ForecastsListComponent
  }
];
export const routing: ModuleWithProviders<AppModule> =
  RouterModule.forRoot(appRoutes);
