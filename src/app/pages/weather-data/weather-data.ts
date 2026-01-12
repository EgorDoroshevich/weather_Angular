import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { forkJoin } from 'rxjs';
import { WeatherService } from '../../data/services/weather';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { WeatherMinsk } from '../weather-minsk/weather-minsk';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoadingData } from '../../data/services/loading';
import { CurrentTemperature, WeatherData } from '../../data/interfaces/interface';

@Component({
  selector: 'app-weather-data',
  standalone: true,
  imports: [NzTableModule, CommonModule, ChartModule, WeatherMinsk, RouterLink, RouterLinkActive],
  templateUrl: './weather-data.html',
  styleUrl: './weather-data.scss',
})
export class WeatherDataComponent implements OnInit {
  data: WeatherData[] = [
    { country: 'Беларусь', city: 'Минск', lat: 53.9, lon: 27.56 },
    { country: 'Россия', city: 'Москва', lat: 55.75, lon: 37.61 },
    { country: 'Казахстан', city: 'Астана', lat: 51.16, lon: 71.47 },
    { country: 'Молдова', city: 'Кишинёв', lat: 47.00556, lon: 28.8575 },
    { country: 'Азербайджан', city: 'Баку', lat: 40.409264, lon: 49.867092 },
    { country: 'Армения', city: 'Ереван', lat: 40.1872023, lon: 44.515209 },
    { country: 'Кыргызстан', city: 'Бишкек', lat: 42.8746212, lon: 74.5697617 },
    { country: 'Таджикистан', city: 'Душанбе', lat: 38.559772, lon: 68.787038 },
  ];
  windChartData: any | null[] = null;

  constructor(
    public weatherService: WeatherService,
    private cdr: ChangeDetectorRef,
    public loadingService: LoadingData
  ) {}

  ngOnInit() {
    this.loadTemperatures();
  }

  public loadTemperatures() {
    this.loadingService.show();
    const requests = this.data.map((row) =>
      this.weatherService.getCurrentTemperature(row.lat, row.lon)
    );

    forkJoin(requests).subscribe({
      next: (responses) => {
        this.data = this.data.map((row, id) => ({
          ...row,
          temperature: responses[id].current.temperature_2m,
          windSpeed: responses[id].current.wind_speed_10m,
        }));
        this.buildWindPie();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      },
    });

    this.cdr.detectChanges();
  }

  private buildWindPie() {
    this.windChartData = {
      labels: [...this.data.map((d) => d.country)],
      datasets: [
        {
          data: [...this.data.map((d) => d.windSpeed)],
          backgroundColor: [
            '#DC143C',
            '#4169E1',
            '#ffd700',
            '#F59E0B',
            '#10B981',
            '#EF4444',
            '#F97316',
            '#8B5CF6',
          ],
          borderColor: '#ffffff',
          borderWidth: 0.3,
        },
      ],
    };
    this.cdr.detectChanges();
  }
  windChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'left',
        labels: {
          color: '#333',
          font: { size: 14 },
          padding: 20,
          usePointStyle: true,
        },
      },
    },
    layout: { margin: { left: 20 } },
  };
}
