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
    const locationData = await this.iplocationService.getLocationData({}); // Passing an empty object for request
    const latitude = locationData.data.latitude;
    const longitude = locationData.data.longitude;
    const location = `${latitude}, ${longitude}`; // Add space between latitude and longitude

    const apiKey = this.configService.get<string>('REACT_APP_TOMORROW_API_KEY');
    const url = `${this.configService.get<string>('REACT_APP_TOMORROW_API_URL')}?location=${location}&timesteps=${timesteps}&apikey=${apiKey}`;
    const response = await axios.get(url, { headers: { accept: 'application/json' } });
    return response.data;
  }

  private async updateWeatherData() {
    const hourlyData = await this.fetchWeatherData('1h');
    const dailyData = await this.fetchWeatherData('1d');
    
    const newData = {
      daily: dailyData.timelines.daily,
      hourly: hourlyData.timelines.hourly,
      location: hourlyData.location, // Assuming location is same in both responses
    };
    
    this.saveWeatherData(newData);
  }

  private async isWeatherDataOutdated() {
    const data = this.loadWeatherData();

    if (data.hourly.length === 0) {
      return true;
    }

    const firstForecastTime = new Date(data.hourly[0].time).getTime();
    const currentTime = new Date().getTime();

    const differenceInHours = (currentTime - firstForecastTime) / (1000 * 60 * 60);
    return differenceInHours > 1;
  }

  async getCurrentWeather() {
    if (await this.isWeatherDataOutdated()) {
      await this.updateWeatherData();
    }

    const data = this.loadWeatherData();
    return data.hourly[0];
  }

  async getWeather120Hours() {
    if (await this.isWeatherDataOutdated()) {
      await this.updateWeatherData();
    }

    const data = this.loadWeatherData();
    return data.hourly;
  }

  async getWeather5Days() {
    if (await this.isWeatherDataOutdated()) {
      await this.updateWeatherData();
    }

    const data = this.loadWeatherData();
    return data.daily;
  }
}
