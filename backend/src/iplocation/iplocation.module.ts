import { Module } from '@nestjs/common';
import { IplocationService } from './iplocation.service';
import { IplocationController } from './iplocation.controller';

@Module({
  providers: [IplocationService],
  controllers: [IplocationController]
})
export class IplocationModule {}
