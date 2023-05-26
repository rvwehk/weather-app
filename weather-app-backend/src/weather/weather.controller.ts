import { CacheInterceptor, CacheKey, CacheTTL, Controller, Get, Param, Query, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { formatCityData } from 'src/common/formatCityData';
import { formatWeatherData } from 'src/common/formatWeatherData';
import { WeatherService } from './weather.service';

@Controller('weather')
@UseInterceptors(CacheInterceptor)
export class WeatherController {
    constructor(private readonly weatherService: WeatherService) { }

    @ApiOperation({ summary: 'Get city coordinates' })
    @ApiResponse({ status: 200, description: 'City coordinates found!' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get(':city')
    @CacheKey('city')
    @CacheTTL(60000)
    async getWeather(@Param('city') city: string): Promise<any> {
        let data = await this.weatherService.getCityCoordinate(city);
        const formattedData = formatCityData(data);
        return formattedData;
    }

    @ApiOperation({ summary: 'Get city weather' })
    @ApiResponse({ status: 200, description: 'City weather found!' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @Get()
    @CacheKey('weather')
    @CacheTTL(60000)
    async getWeatherByCoords(@Query('lat') lat: number, @Query('lon') lon: number): Promise<WeatherData[]> {
        let data = await this.weatherService.getWeatherByCoords(lat, lon);
        const formattedData = formatWeatherData(data);
        return formattedData;
    }
}
