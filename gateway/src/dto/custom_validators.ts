import { applyDecorators } from '@nestjs/common';
import {
    IsNotEmpty,
    IsNumber,
    Max,
    Min,
    ValidationOptions,
} from 'class-validator';


/**
 * Custom decorator to validate latitude values.
 * 
 * Ensures the number is between -90 and 90 and is not empty.
 * 
 * @param validationOptions Optional configuration for validation behavior.
 * @returns A composed decorator with latitude validation rules.
 */
export function IsLatitude(validationOptions?: ValidationOptions) {
    return applyDecorators(
        IsNumber({}, validationOptions),
        IsNotEmpty(validationOptions),
        Min(-90, validationOptions),
        Max(90, validationOptions),
    );
}


/**
 * Custom decorator to validate longitude values.
 * 
 * Ensures the number is between -180 and 180 and is not empty.
 * 
 * @param validationOptions Optional configuration for validation behavior.
 * @returns A composed decorator with longitude validation rules.
 */
export function IsLongitude(validationOptions?: ValidationOptions) {
    return applyDecorators(
        IsNumber({}, validationOptions),
        IsNotEmpty(validationOptions),
        Min(-180, validationOptions),
        Max(180, validationOptions),
    );
}
