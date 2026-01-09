import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class WeatherService {
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';
  http = inject(HttpClient);

  getCurrentTemperature(lat: number, lon: number): Observable<any> {
    const params = {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,wind_speed_10m',
    };
    return this.http.get(this.baseUrl, { params });
  }
}
