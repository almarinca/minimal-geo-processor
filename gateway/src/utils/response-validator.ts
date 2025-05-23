import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToInstance, ClassConstructor } from 'class-transformer';
import { validate } from 'class-validator';


export async function validateResponse<T>(
    cls: ClassConstructor<T>,
    data: any
): Promise<T> {
    const instance = plainToInstance(cls, data);
    const errors = await validate(instance as any, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    if (errors.length > 0) {
        throw new HttpException({
            data: 'Invalid response received from the backend server.',
            status: HttpStatus.BAD_GATEWAY,
            errors
        },
            HttpStatus.BAD_GATEWAY,
        );
    }

    return instance;
}