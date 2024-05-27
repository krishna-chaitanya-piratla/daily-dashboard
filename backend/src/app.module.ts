import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TodosModule } from './todos/todos.module';
import { IplocationModule } from './iplocation/iplocation.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), TodosModule, IplocationModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
