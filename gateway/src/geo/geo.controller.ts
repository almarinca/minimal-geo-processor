import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { GeoService } from './geo.service';
import { GeoData, GeoSummary } from 'src/dto/coordinates.dto';


/**
 * Controller for handling geographic data-related endpoints.
 *
 * Provides an endpoint to process a list of geographic points and return
 * a geographic summary including the centroid and bounds.
 */
@Controller('geo')
export class GeoController {
  constructor(private readonly geoService: GeoService) { }

  /**
   * POST /geo/summary
   *
   * Accepts a list of geographic points and returns a summary with
   * the centroid and bounding box (north, south, east, west).
   *
   * @param data The input geographic data containing an array of GeoPoints.
   * @returns A promise resolving to a GeoSummary object.
   */
  @Post('summary')
  @HttpCode(HttpStatus.OK)
  async process(@Body() data: GeoData): Promise<GeoSummary> {
    return this.geoService.processPoints(data);
  }
}
