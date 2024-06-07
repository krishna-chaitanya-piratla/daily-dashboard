import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  async getCurrentWeather() {
    return await this.weatherService.getCurrentWeather();
  }

  @Get('120hours')
  async getWeather120Hours() {
    return await this.weatherService.getWeather120Hours();
  }

  @Get('fivedays')
  async getWeather5Days() {
    return await this.weatherService.getWeather5Days();
  }
}
