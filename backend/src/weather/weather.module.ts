import { Module } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { ConfigModule } from '@nestjs/config';
import { IplocationModule } from 'src/iplocation/iplocation.module';

@Module({
  imports: [ConfigModule, IplocationModule],
  providers: [WeatherService],
  controllers: [WeatherController]
})
export class WeatherModule {}
