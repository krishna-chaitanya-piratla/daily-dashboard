import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class IplocationService {
  private IP_LOCATION_DATA_FILE_PATH: string;

  constructor(private configService: ConfigService) {
    const DATA_LOCATION = this.configService.get<string>('DATA_LOCATION_LOCAL');
    this.IP_LOCATION_DATA_FILE_PATH = path.resolve(DATA_LOCATION, 'ipapi_response.json');
    this.ensureDataFileExists();
  }

  private ensureDataFileExists() {
    const dirPath = path.dirname(this.IP_LOCATION_DATA_FILE_PATH);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    if (!fs.existsSync(this.IP_LOCATION_DATA_FILE_PATH)) {
      fs.writeFileSync(this.IP_LOCATION_DATA_FILE_PATH, JSON.stringify({ ip: '', data: null }), 'utf8');
    }
  }

  private loadIpApiResponse() {
    const data = fs.readFileSync(this.IP_LOCATION_DATA_FILE_PATH, 'utf8');
    return JSON.parse(data);
  }

  private saveIpApiResponse(ip: string, data: any) {
    fs.writeFileSync(this.IP_LOCATION_DATA_FILE_PATH, JSON.stringify({ ip, data }, null, 2), 'utf8');
  }

  async getPublicIp(): Promise<string> {
    const response = await axios.get('http://checkip.amazonaws.com');
    return response.data.trim();
  }

  async getClientIp(req: any): Promise<string> {
    let clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (clientIp === '::1' || clientIp === '127.0.0.1') {
      clientIp = await this.getPublicIp();
    }
    return clientIp;
  }

  async getLocationData(req: any) {
    const ip = await this.getClientIp(req);
    const { ip: storedIp, data } = this.loadIpApiResponse();

    
    if (ip === storedIp && data) {
      return { ip, data };
    }

    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const newData = response.data;
    this.saveIpApiResponse(ip, newData);
    return { ip, data: newData };
  }
}
