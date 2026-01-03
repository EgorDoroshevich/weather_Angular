import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { WeatherMinskService } from '../../data/services/weather-minsk';

type Period = 'day' | 'week' | 'month';

@Component({
  selector: 'app-weather-minsk',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './weather-minsk.html',
  styleUrl: './weather-minsk.scss',
})
export class WeatherMinsk implements OnInit {
  selectedPeriod: Period = 'day';
  tempChartData: any | null = null;
  humidityChartData: any | null = null;

  constructor(private minskWeatherService: WeatherMinskService) {}

  ngOnInit() {
    this.changePeriod('day');
    this.loadHumidityWeek();
  }

  changePeriod(period: Period) {
    this.selectedPeriod = period;

    const now = new Date();
    const end = now.toISOString().slice(0, 10);

    const startDate = new Date(now);
    if (period === 'day') {
      startDate.setDate(now.getDate() - 1);
    } else if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setMonth(now.getMonth() - 1);
    }
    const start = startDate.toISOString().slice(0, 10);

    this.minskWeatherService.getMinskTemperature(start, end).subscribe((data) => {
      const d = data as any;
      let labels = d.hourly.time;

      if (period === 'day') {
        labels = d.hourly.time.map((t: string) =>
          new Date(t).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        );
      } else {
        labels = d.hourly.time.map((t: string) =>
          new Date(t).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
        );
      }

      this.tempChartData = {
        labels,
        datasets: [
          {
            label: 'Температура, °C',
            data: d.hourly.temperature_2m,
            borderColor: '#1890ff',
            fill: false,
            tension: 0.3,
          },
        ],
      };
    });
  }

  private loadHumidityWeek() {
    const now = new Date();
    const end = now.toISOString().slice(0, 10);

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
    const start = startDate.toISOString().slice(0, 10);

    this.minskWeatherService.getHumidityRange(start, end).subscribe((res) => {
      const r = res as any;
      const times: string[] = r.hourly.time;
      const humidity: number[] = r.hourly.relative_humidity_2m;

      // группируем по дню и считаем среднее
      const byDay = new Map<string, number[]>();

      times.forEach((t, i) => {
        const day = t.slice(0, 10); // "YYYY-MM-DD"
        const value = humidity[i];
        const arr = byDay.get(day) ?? [];
        arr.push(value);
        byDay.set(day, arr);
      });

      const labels: string[] = [];
      const values: number[] = [];

      byDay.forEach((arr, day) => {
        const avg = arr.reduce((sum, v) => sum + v, 0) / arr.length;
        labels.push(day);
        values.push(Math.round(avg));
      });

      this.humidityChartData = {
        labels,
        datasets: [
          {
            label: 'Средняя влажность, %',
            data: values,
            backgroundColor: '#40a9ff',
          },
        ],
      };
    });
  }
}
