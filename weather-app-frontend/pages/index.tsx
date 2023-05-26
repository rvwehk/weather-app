import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import SearchInput from 'components/SearchInput'
import Head from 'next/head';

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3001/weather/paris')
//   const city = await res.json()

//   return {
//     props: {
//       city,
//     },
//   }
// }

export default function Home() {
  const router = useRouter();
  const [color, setColor] = useState('#134601');

  const handleSearch = async (search: string) => {
    if (search !== '') {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/weather/${search}`)
        const data = await res.json()
        let coordinates = {
          lat: data.lat,
          lon: data.lon,
          city: search
        }
        router.push({
          pathname: '/weather',
          query: coordinates,
        });
        // router.push('/my-page', { query: coordinates }, { shallow: false, scroll: false });
      } catch (error) {
        console.error(error);
      }
    }
  }

  const handleColorChange = (event: any) => {
    if (event.target.value === '') {
      setColor('#134601')
    } else {
      setColor(event.target.value);
    }
  };

  return (
    <div className="home" style={{ backgroundColor: color }}>
      <Head>
        <title>Weather App</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" />
      </Head>
      <div className="switcher">
        <label htmlFor="color-switcher">Changer la couleur</label>
        <input type="text" id="color-switcher" onChange={handleColorChange} placeholder="Entrer une couleur de fond" />
      </div>
      <div className="wa-title">
        <span className='text-line'>The Forecast</span>
        <span className='text-line'>Weather App</span>
      </div>
      <SearchInput handleSearch={handleSearch} />
    </div>
  )
}
