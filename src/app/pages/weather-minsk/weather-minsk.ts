import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { WeatherMinskService } from '../../data/services/weather-minsk';
import { LoadingData } from '../../data/services/loading';
import { HumidityRange, MinskTemperature } from '../../data/interfaces/interface';

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

  constructor(
    private minskWeatherService: WeatherMinskService,
    private cdr: ChangeDetectorRef,
    public loadingService: LoadingData
  ) {}

  ngOnInit() {
    this.changePeriod('day');
    this.loadHumidityWeek();
  }

  public changePeriod(period: Period) {
    this.selectedPeriod = period;

    const now = new Date();
    const end = now.toISOString().slice(0, 10);

    const startDate = new Date(now);
    if (period === 'day') {
      startDate.setDate(now.getDate());
    } else if (period === 'week') {
      startDate.setDate(now.getDate() - 7);
    } else {
      startDate.setMonth(now.getMonth() - 1);
    }
    const start = startDate.toISOString().slice(0, 10);

    this.minskWeatherService.getMinskTemperature(start, end).subscribe((data: MinskTemperature) => {
      let labels = data.hourly.time;
      if (period === 'day') {
        labels = data.hourly.time.map((t: string) =>
          new Date(t).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
        );
      } else {
        labels = data.hourly.time.map((t: string) =>
          new Date(t).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
        );
      }
      this.tempChartData = {
        labels,
        datasets: [
          {
            label: 'Температура, °C',
            data: [...data.hourly.temperature_2m],
            borderColor: '#1890ff',
          },
        ],
      };
      this.cdr.detectChanges();
    });
  }

  public loadHumidityWeek() {
    const now = new Date();
    const end = now.toISOString().slice(0, 10);

    const startDate = new Date(now);
    startDate.setDate(now.getDate() - 7);
    const start = startDate.toISOString().slice(0, 10);

    this.minskWeatherService.getHumidityRange(start, end).subscribe((res: HumidityRange) => {
      const times = res.hourly.time.map((time: string) =>
        new Date(time).toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
      );
      const humidity = res.hourly.relative_humidity_2m;
      const byDay = new Map<string, number[]>();

      times.forEach((time, id) => {
        const day = time.slice(0, 10);
        const value = humidity[id];
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
        labels: [...labels],
        datasets: [
          {
            label: 'Средняя влажность, %',
            data: [...values],
            backgroundColor: '#40a9ff',
          },
        ],
      };
      this.cdr.detectChanges();
    });
  }
}
