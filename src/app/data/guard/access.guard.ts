import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

export const canActivate = () => {
  const isLoggedIn: boolean = inject(AuthService).isAuth;
  if (isLoggedIn) {
    return true;
  }
  return inject(Router).createUrlTree(['sign-in']);
};
