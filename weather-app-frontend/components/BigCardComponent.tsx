import Image from 'next/image';
import { formatDate } from 'utils/formatDate';

interface WComponent {
    item: any,
}

const BigCardComponent = ({ item }: WComponent) => {
    const staticPathPrefix = "https://openweathermap.org/img/wn/"
    const staticPathSurfix = "@4x.png"
    return (
        <div className="big-card-container">
            <div className="info">
                <div className="condition">
                    {
                        item?.icon && (
                            <Image
                                src={staticPathPrefix + item?.icon + staticPathSurfix}
                                alt="Condition"
                                width={80}
                                height={80}
                            // className='condition-image'
                            />
                        )
                    }
                </div>
                <p className="date">
                    {formatDate(item?.date)}
                </p>
            </div>
            <div className="info">
                <div className="info-left">
                    <span className="detail">Jour - {item?.temp_day}°C</span>
                    <span className="detail">Nuit - {item?.temp_night}C</span>
                    <span className="detail">Humidité - {item?.humidity}%</span>
                </div>
                <div className="info-right">
                    <span className="detail">Pression - {item?.pressure}hPa</span>
                    <span className="detail">Vent - {item?.wind_speed}Km/h</span>
                </div>
            </div>
        </div>
    );
}

export default BigCardComponent;