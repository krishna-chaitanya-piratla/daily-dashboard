import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('current')
  async getCurrentWeather(@Query('units') units: string = 'imperial') {
    return await this.weatherService.getCurrentWeather(units);
  }

  @Get('120hours')
  async getWeather120Hours(@Query('units') units: string = 'imperial') {
    return await this.weatherService.getWeather120Hours(units);
  }

  @Get('fivedays')
  async getWeather5Days(@Query('units') units: string = 'imperial') {
    return await this.weatherService.getWeather5Days(units);
  }
}
