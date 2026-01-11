import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

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
