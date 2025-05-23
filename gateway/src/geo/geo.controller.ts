import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GeoService } from './geo.service';
import { GeoData, GeoSummary } from 'src/dto/coordinates.dto';


@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) { }

  @Post('summary')
  @HttpCode(HttpStatus.OK)
  async process(@Body() data: GeoData): Promise<GeoSummary> {
    return this.geoService.processPoints(data);
  }
}
