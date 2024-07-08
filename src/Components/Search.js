import React, { useState } from 'react';
import axios from 'axios';
import './style.css';

function Search() {
  const [data, setData] = useState({
    celcius: 10,
    name: 'London',
    humidity: 10,
    speed: 2,
    Image: '/images/clouds.png'
  });
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleClick = () => {
    if (name !== "") {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=05d296a37f2c3cbdc4540cb989415d47&units=metric`;
      axios.get(apiURL)
        .then(res => {
          let imagePath = '';
          const weatherMain = res.data.weather[0].main.toLowerCase();

          switch (weatherMain) {
            case 'clouds':
              imagePath = '/images/cloud2.png';
              break;
            case 'clear':
              imagePath = '/images/sun2.png';
              break;
            case 'rain':
              imagePath = '/images/rain.png';
              break;
            case 'drizzle':
              imagePath = '/images/cloud-sun2.png';
              break;
            case 'mist':
              imagePath = '/images/mist2.jpeg';
              break;
            default:
              imagePath = '/images/clouds.png';
          }

          setData({
            celcius: res.data.main.temp,
            name: res.data.name,
            humidity: res.data.main.humidity,
            speed: res.data.wind.speed,
            Image: imagePath
          });
          setError('');
        })
        .catch(err => {
          if (err.response && err.response.status === 404) {
            setError("Invalid City Name");
          } else {
            setError('An error occurred');
          }
        });
    }
  };

  return (
    <div className='container'>
      <div className='weather'>
        <div className='search'>
          <input type='text' placeholder='Enter city name' onChange={e => setName(e.target.value)} />
          <button onClick={handleClick}>
            <img src='/images/search.png' alt='search' />
          </button>
        </div>

        <div className='error'>
          <p>{error}</p>
        </div>

        <div className='weatherInfo'>
          <img src={data.Image} alt='weather icon' className='icon' />
          <h1>{Math.round(data.celcius)}°C</h1>
          <h2>{data.name}</h2>
          <div className='details'>
            <div className='col'>
              <img src='/images/humidity.png' alt='humidity' />
              <div className='Humidity'>
                <p>{Math.round(data.humidity)}%</p>
                <p>Humidity</p>
              </div>
            </div>

            <div className='col'>
              <img src='/images/wind.png' alt='wind' />
              <div className='Wind'>
                <p>{Math.round(data.speed)} Km/h</p>
                <p>Wind</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
