import { formatDate } from "utils/formatDate";
import Image from 'next/image'

interface WComponent {
    item: any,
    handleCurrentWeather: Function
}

const SmallCardComponent = ({ item, handleCurrentWeather }: WComponent) => {
    const staticPathPrefix = "https://openweathermap.org/img/wn/"
    const staticPathSurfix = "@4x.png"
    return (
        <div className="small-card-container" onClick={() => handleCurrentWeather(item)}>
            <div className="small-info">
                <div className="">
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
                <div className="small-date">
                    <span className='small-date-one'>
                        {formatDate(item?.date, 'day')}
                    </span>
                    <span className='small-date-two'>
                        {formatDate(item?.date, 'date-month')}
                    </span>
                </div>
                <div className="small-temp">
                    {item?.temp_max}°C
                </div>
            </div>
        </div>
    );
}

export default SmallCardComponent;