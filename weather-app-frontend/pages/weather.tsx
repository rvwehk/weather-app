import BigCardComponent from "components/BigCardComponent";
import SmallCardComponent from "components/SmallCardComponent";
import { Router, useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from "react";
import GoBackIcon from "components/GoBackIcon";

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//     console.warn('getServerSideProps: ', context);

//     const res = await fetch(`http://localhost:3001/weather?lat=48.8534&lon=2.3488`)
//     const data = await res.json()

//     if (!data) {
//         return {
//             notFound: true,
//         }
//     }

//     return {
//         props: { data }
//     }
// }

const Weather = ({ data }: any) => {
    const { query } = useRouter()
    const router = useRouter();


    const [weatherData, setWeatherData] = useState<any[]>([])
    const [currentWeather, setCurrentWeather] = useState<any>()
    const [backgroundImage, setBackgroundImage] = useState<string>('')

    useEffect(() => {
        getWeather()
    }, [query])


    const getWeather = async () => {
        if (query?.lat && query?.lon) {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather?lat=${query?.lat}&lon=${query?.lon}`)
                const data = await res.json()

                const cityRes = await fetch(`https://api.unsplash.com/search/photos?client_id=${process.env.NEXT_PUBLIC_API_KEY}&page=1&query=${query?.city}&per_page=1`)
                const cityData = await cityRes.json()

                setWeatherData(data)
                setCurrentWeather(data[0])
                setBackgroundImage(`url(${cityData?.results[0]?.urls?.full})`)

            } catch (error) {
                console.error(error);
            }
        }
    }

    const handleCurrentWeather = (item: any) => {
        if (item.date === currentWeather?.date) {
            setCurrentWeather(weatherData[0])
        } else {
            setCurrentWeather(item)
        }
    }

    return (
        <div className="weather"
            style={{
                backgroundImage,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="left-side">
                <div className="go-back-button" onClick={() => router.back()}>
                    <GoBackIcon className="go-back-icon" />
                </div>
                <p className="city-name">{query?.city}</p>
                <div className="bottom-card">
                    {currentWeather && <BigCardComponent item={currentWeather} />}
                </div>
            </div>
            <div className="right-side">
                {
                    weatherData?.length > 0 && weatherData?.slice(1).map((item: any, index: number) => {
                        return <SmallCardComponent key={index} item={item} handleCurrentWeather={handleCurrentWeather} />
                    })
                }
            </div>
        </div>
    );
}

export default Weather;