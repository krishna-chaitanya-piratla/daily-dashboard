import { Controller, Get, Req } from '@nestjs/common';
import { IplocationService } from './iplocation.service';
import { Request } from 'express';

@Controller('ip')
export class IplocationController {
  constructor(private readonly iplocationService: IplocationService) {}

  @Get()
  async getLocationData(@Req() request: Request): Promise<{ ip: string, data: any }> {
    return await this.iplocationService.getLocationData(request);
  }

}
