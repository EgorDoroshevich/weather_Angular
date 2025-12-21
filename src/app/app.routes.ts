import { Routes } from '@angular/router';
import { AsideNotes } from './pages/aside/aside-notes/aside-notes';
import { WeatherDataComponent } from './pages/weather-data/weather-data';

export const routes: Routes = [
  { path: '', redirectTo: 'weather', pathMatch: 'full' },
  { path: 'notes', component: AsideNotes },
  { path: 'weather', component: WeatherDataComponent },
];
