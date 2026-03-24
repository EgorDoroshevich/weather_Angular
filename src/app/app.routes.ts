import { AsideNotes } from './pages/aside/aside-notes/aside-notes';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Success } from './pages/success/success';
import { WeatherDataComponent } from './pages/weather-data/weather-data';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/weather', pathMatch: 'full' },
  { path: 'weather', component: WeatherDataComponent },
  { path: 'notes', component: AsideNotes },
  { path: 'sign-in', component: SignIn },
  { path: 'sign-up', component: SignUp },
  { path: 'success', component: Success },
];
