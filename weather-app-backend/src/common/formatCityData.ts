export const formatCityData = (data: any[]): CityData => {
    let obj = {
        name: data[0]?.name,
        lat: data[0]?.lat,
        lon: data[0]?.lon,
    }
    return obj
}