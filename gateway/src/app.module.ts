import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeoModule } from './geo/geo.module';
import { CacheModule } from '@nestjs/cache-manager';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    GeoModule,
  ],
})
export class AppModule { }
