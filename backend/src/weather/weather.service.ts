import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IplocationService } from 'src/iplocation/iplocation.service';

@Injectable()
export class WeatherService {
  private WEATHER_DATA_FILE_PATH: string;

  constructor(
    private configService: ConfigService,
    private iplocationService: IplocationService
  ) {
    const DATA_LOCATION = this.configService.get<string>('DATA_LOCATION_LOCAL');
    this.WEATHER_DATA_FILE_PATH = path.resolve(DATA_LOCATION, 'weather-data.json');
    this.ensureDataFileExists();
  }

  private ensureDataFileExists() {
    const dirPath = path.dirname(this.WEATHER_DATA_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(this.WEATHER_DATA_FILE_PATH)) {
      fs.writeFileSync(this.WEATHER_DATA_FILE_PATH, JSON.stringify({ daily: [], hourly: [], location: {} }), 'utf8');
    }
  }

  private loadWeatherData() {
    const data = fs.readFileSync(this.WEATHER_DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  }

  private saveWeatherData(data: any) {
    fs.writeFileSync(this.WEATHER_DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
  }

  private async fetchWeatherData(timesteps: string) {
    const locationData = await this.iplocationService.getLocationData({});
    const latitude = locationData.data.latitude;
    const longitude = locationData.data.longitude;
    const location = `${latitude}, ${longitude}`;

    const apiKey = this.configService.get<string>('REACT_APP_TOMORROW_API_KEY');
    const url = `${this.configService.get<string>('REACT_APP_TOMORROW_API_URL')}?location=${location}&timesteps=${timesteps}&apikey=${apiKey}`;
    const response = await axios.get(url, { headers: { accept: 'application/json' } });
    return { data: response.data, location: { lat: latitude, lon: longitude } };
  }

  private async updateWeatherData() {
    const hourlyResponse = await this.fetchWeatherData('1h');
    const dailyResponse = await this.fetchWeatherData('1d');

    const newData = {
      daily: dailyResponse.data.timelines.daily,
      hourly: hourlyResponse.data.timelines.hourly,
      location: hourlyResponse.data.location,
    };

    this.saveWeatherData(newData);
  }

  async getCurrentWeather() {
    const data = this.loadWeatherData();

    if (data.hourly.length === 0) {
      await this.updateWeatherData();
      data.hourly = this.loadWeatherData().hourly;
    }

    return data.hourly[0];
  }

  async getWeather120Hours() {
    const data = this.loadWeatherData();

    if (data.hourly.length === 0) {
      await this.updateWeatherData();
      data.hourly = this.loadWeatherData().hourly;
    }

    return data.hourly;
  }

  async getWeather5Days() {
    const data = this.loadWeatherData();

    if (data.daily.length === 0) {
      await this.updateWeatherData();
      data.daily = this.loadWeatherData().daily;
    }

    return data.daily;
  }
}
