export const formatWeatherData = (data: any): WeatherData[] => {
    let arr: any[] = []
    data?.daily.forEach((element: any) => {
        arr.push({
            pressure: element?.pressure,
            humidity: element?.humidity,
            wind_speed: element?.wind_speed,
            icon: element?.weather[0].icon,
            temp_max: element?.temp.max,
            temp_day: element?.temp?.day,
            temp_night: element?.temp?.night,
            date: element?.dt
        })
    });
    return arr
}