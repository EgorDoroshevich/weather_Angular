export interface WeatherData {
  country: string;
  city: string;
  lat: number;
  lon: number;
  temperature?: number;
  windSpeed?: number;
}
