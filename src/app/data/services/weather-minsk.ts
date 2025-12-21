import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
//для линейного и столбчатого графиков инжектить WeatherMinsk и вызывать его методы при смене периода.
export class WeatherMinskService {
  http = inject(HttpClient);
  private readonly baseUrl = 'https://api.open-meteo.com/v1/forecast';

  getMinskTemperature(start: string, end: string) {
    const params = {
      latitude: 53.9,
      longitude: 27.56,
      hourly: 'temperature_2m',
      start_date: start,
      end_date: end,
      timezone: 'auto',
    };
    return this.http.get('https://api.open-meteo.com/v1/forecast', { params });
  }
  getHumidityRange(start: string, end: string): Observable<any> {
    const params = {
      latitude: 53.9,
      longitude: 27.56,
      hourly: 'relative_humidity_2m',
      start_date: start,
      end_date: end,
      timezone: 'auto',
    };
    return this.http.get(this.baseUrl, { params });
  }
}
