import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HumidityRange, MinskTemperature } from '../interfaces/interface';

@Injectable({
  providedIn: 'root',
})
//для линейного и столбчатого графиков инжектить WeatherMinsk и вызывать его методы при смене периода.
export class WeatherMinskService {
  http = inject(HttpClient);
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  getMinskTemperature(start: string, end: string): Observable<MinskTemperature> {
    const params = {
      latitude: 53.9,
      longitude: 27.56,
      hourly: 'temperature_2m',
      start_date: start,
      end_date: end,
      timezone: 'auto',
    };
    return this.http.get<MinskTemperature>(this.baseUrl, { params });
  }
  getHumidityRange(start: string, end: string): Observable<HumidityRange> {
    const params = {
      latitude: 53.9,
      longitude: 27.56,
      hourly: 'relative_humidity_2m',
      start_date: start,
      end_date: end,
      timezone: 'auto',
    };
    return this.http.get<HumidityRange>(this.baseUrl, { params });
  }
}
