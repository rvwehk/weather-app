import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

@Module({
  imports: [CacheModule.register({
    ttl: 60000,
    max: 10,
  })],
  controllers: [WeatherController,],
  providers: [WeatherService, {
    provide: APP_INTERCEPTOR,
    useClass: CacheInterceptor,
  },]
})
export class WeatherModule { }

