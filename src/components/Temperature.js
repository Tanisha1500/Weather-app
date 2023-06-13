
import { formatTimeZone } from '../services/weatherServices';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { UilLocationPoint, UilWind, UilTear } from '@iconscout/react-unicons';
import { useNavigate } from 'react-router-dom';
import Hourly from './Hourly';

import { Link } from 'react-router-dom';

function Temparature({ weather ,units }) {

  const[forecast,setForecast]=useState(null);
 


  const navigate = useNavigate();

  if (!weather || !weather.dt) {
    return null;
  }


  const forecastPage = async () => {
    try {
      if (!weather || !weather.lat || !weather.lon) {
        throw new Error('Weather data is not available.');
      }
      // const response = await axios.get('/forecast', { params: { lat:weather.lat,lon:weather.lon,units:weather.units } });
      const response = await axios.get('http://localhost:3000/forecast', {params: { lat:weather.lat,lon:weather.lon,units:units}});
      const forecastData = response.data;
      console.log(forecastData);
      setForecast(forecastData);
      
      
      // navigate({
      //   pathname:'/hourly',
      console.log(weather.timezone);
      navigate('/hourly', { state: { forecast: forecastData,dte:weather.dt,time:weather.timezone} })
      
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  

  return (
    <div>
      <div className='pt-5 text-center text-custom-white text-today'>
        {formatTimeZone(weather.dt, weather.timezone)}
      </div>

      <div className='flex items-center justify-center'>
      {/* <Link to={{ pathname: '/hourly', state: { forecast: forecast} }}> */}
      <Link to='/hourly'>
        <button className='flex items-center justify-center pt-1 pb-2 text-custom text-center' onClick={forecastPage}>
          {(weather.temp).toFixed()}&deg;
        </button>
        </Link>
      </div>

      <div className='flex items-center justify-center pb-6 text-cloudy'>
        {weather.detail}
      </div>

      <div className='flex items-center  justify-center space-x-5 pb-4'>
        <div className='flex items-center space-x-2'>
          <UilWind />
          <p className='pl-1'>Wind | {(weather.speed.toFixed())} km/h </p>
         
        </div>
      
      </div>

      <div className='flex items-center justify-center space-x-5  pb-4 pr-6'>
        <div className='flex items-center '>
          
          <UilTear />
          <p className='pl-1'>Hum  |  {weather.humidity} </p>
         
      </div>
      </div>
      </div>
    
  );
}

export default Temparature;
