export interface CurrentTemperature {
  latitude: number;
  longitude: number;
  current: { temperature_2m: number; wind_speed_10m: number };
}
export interface MinskTemperature {
  latitude: number;
  longitude: number;
  hourly: string;
  start_date: string;
  end_data: string;
  timezone?: string;
}
export interface HumidityRange {
  latitude: number;
  longitude: number;
  hourly: string;
  start_date: string;
  end_data: string;
  timezone?: string;
}
export interface AsideCard {
  id: number;
  text: string;
  date: Date;
}
export interface WeatherData {
  country: string;
  city: string;
  lat: number;
  lon: number;
  temperature?: number;
  windSpeed?: number;
}
