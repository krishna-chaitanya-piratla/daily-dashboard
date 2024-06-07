import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { IplocationModule } from './iplocation/iplocation.module';
import { UserprofileModule } from './userprofile/userprofile.module';
import { WeatherModule } from './weather/weather.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TodosModule, IplocationModule, UserprofileModule, WeatherModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
