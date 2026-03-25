import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from '../interfaces/interface';
import { tap } from 'rxjs';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  localStorage = inject(LocalStorage);
  url = 'https://icherniakov.ru/yt-course/auth/';
  access_token: string | null = null;
  refresh_token: string | null = null;

  get isAuth() {
    if (!this.access_token) {
      this.access_token = this.localStorage.get('token');
    }
    return !!this.access_token;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.url}token`, fd).pipe(
      tap((val: any) => {
        this.access_token = val.access_token;
        this.refresh_token = val.refresh_token;
        this.localStorage.set('token', this.access_token);
        this.localStorage.set('refresh_token', this.refresh_token);
      }),
    );
  }
}
