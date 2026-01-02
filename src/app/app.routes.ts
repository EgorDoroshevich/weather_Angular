import { AsideNotes } from './pages/aside/aside-notes/aside-notes';
import { WeatherDataComponent } from './pages/weather-data/weather-data';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherDataComponent },
  { path: 'notes', component: AsideNotes },
];
