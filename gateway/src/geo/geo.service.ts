import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { HttpException, Inject, Injectable } from '@nestjs/common';
import { GeoData, GeoSummary } from 'src/dto/coordinates.dto';
import { validateResponse } from 'src/utils/response-validator';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { plainToInstance } from 'class-transformer';
import { createCacheKey } from 'src/utils/cache-key';


@Injectable()
export class GeoService {
  private backendUrl: string | undefined;

  constructor(
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {
    this.backendUrl = this.configService.get<string>('BACKEND_URL');
  }


  async processPoints(data: GeoData) {
    const key = createCacheKey('geo', data);
    const cached = await this.cacheManager.get(key);
    if (cached) {
      console.log("[GeoService] Sending a cached response!")
      const geoData = plainToInstance(GeoSummary, cached);
      return geoData;
    }

    try {
      const response = await axios.post(`${this.backendUrl}/geo/summary`, data);
      const validData = await validateResponse(GeoSummary, response.data);
      await this.cacheManager.set(key, validData);
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
