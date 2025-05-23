import { applyDecorators } from '@nestjs/common';
import {
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
    ValidateNested,
    ValidationOptions,
} from 'class-validator';
import { Type } from 'class-transformer';


export function IsLatitude(validationOptions?: ValidationOptions) {
    return applyDecorators(
        IsNumber({}, validationOptions),
        IsNotEmpty(validationOptions),
        Min(-90, validationOptions),
        Max(90, validationOptions),
    );
}

export function IsLongitude(validationOptions?: ValidationOptions) {
    return applyDecorators(
        IsNumber({}, validationOptions),
        IsNotEmpty(validationOptions),
        Min(-180, validationOptions),
        Max(180, validationOptions),
    );
}


export class GeoPoint {
    @IsLatitude()
    lat: number

    @IsLongitude()
    lng: number
}


export class GeoData {
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => GeoPoint)
    points: GeoPoint[];
}


export class GeoCentroid extends GeoPoint { }


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


export class GeoSummary {
    @ValidateNested()
    @Type(() => GeoCentroid)
    centroid: GeoCentroid

    @ValidateNested()
    @Type(() => GeoBounds)
    bounds: GeoBounds
}
