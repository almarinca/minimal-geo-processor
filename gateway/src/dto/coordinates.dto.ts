import {
    ArrayMinSize,
    IsArray,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsLatitude, IsLongitude } from './custom_validators';


/**
 * Class representing a geographic point.
 * 
 * Contains latitude and longitude with custom validation.
 */
export class GeoPoint {
    @IsLatitude()
    lat: number

    @IsLongitude()
    lng: number
}


/**
 * Class representing the input structure for geographic data.
 * 
 * Contains an array of GeoPoint objects. Minimum size of the array is 1.
 */
export class GeoData {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => GeoPoint)
    points: GeoPoint[];
}


/**
 * Class representing the geographic centroid.
 * 
 * Inherits from GeoPoint and represents the average location of multiple points.
 */
export class GeoCentroid extends GeoPoint { }


/**
 * Class representing the bounding box for a collection of geographic points.
 * 
 * Includes the northernmost, southernmost, easternmost, and westernmost bounds.
 */
export class GeoBounds {
    @IsLatitude()
    north: number

    @IsLatitude()
    south: number

    @IsLongitude()
    east: number

    @IsLongitude()
    west: number
}


/**
 * Class summarizing geographic data.
 * 
 * Contains both the centroid and the bounding box of the provided points.
 */
export class GeoSummary {
    @ValidateNested()
    @Type(() => GeoCentroid)
    centroid: GeoCentroid

    @ValidateNested()
    @Type(() => GeoBounds)
    bounds: GeoBounds
}
