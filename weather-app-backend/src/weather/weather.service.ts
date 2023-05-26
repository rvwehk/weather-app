import { Injectable } from '@nestjs/common';
import { AxiosInstance } from 'axios';
import axios from 'axios';

@Injectable()
export class WeatherService {

    async getCityCoordinate(city: string) {
        const url = `${process.env.CITY_API_URL}?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.warn(error);
        }
    }

    async getWeatherByCoords(lat: number, lon: number) {
        const url = `${process.env.WEATHER_API_URL}?lat=${lat}&lon=${lon}&&appid=${process.env.OPENWEATHER_API_KEY}`;
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.warn(error);
        }
    }
}
