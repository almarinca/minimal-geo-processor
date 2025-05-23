import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, Injectable } from '@nestjs/common';
import { GeoData, GeoSummary } from 'src/dto/coordinates.dto';
import { validateResponse } from 'src/utils/response-validator';


@Injectable()
export class GeoService {
  private backendUrl: string | undefined;

  constructor(
    private readonly configService: ConfigService,
  ) {
    this.backendUrl = this.configService.get<string>('BACKEND_URL');
  }

  async processPoints(data: GeoData) {
    try {
      const response = await axios.post(`${this.backendUrl}/geo/summary`, data);
      const validData = await validateResponse(GeoSummary, response.data);
      return validData;
    } catch (error) {
      console.error('Backend error:', error?.response?.data || error.message);
      throw new HttpException(
        error?.response?.data || 'Unknown backend error',
        error?.response?.status || 500
      );
    }
  }
}
