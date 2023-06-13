import React from 'react'
import { useState } from 'react';
import UilReact from '@iconscout/react-unicons/icons/uil-react';
import Temparature from './Temperature';
import Input from './Input';
import Location from './Location';
import { UilAngleLeft } from '@iconscout/react-unicons';
import { useLoaderData, useLocation, useNavigate } from 'react-router';
import Home from './Home';
import { formatDate, formatTimeZone, iconUrlFromCode } from '../services/weatherServices';
import { DateTime } from 'luxon';





function Hourly({forecastData,dte,time}) {

    const location=useLocation();
    const res=location.state?.forecast;
    const dt=location.state?.dte;
    const timet=location.state?.time;
    // const { forecast } = location.state;
    console.log(dt);
    console.log(timet);
    // console.log(forecast);
    // const { forecastData } = location.state;
    // console.log(forecastData);

    console.log(res)
    const [scrollPosition, setScrollPosition] = useState(0);

    const handleScroll = (e) => {
      const { scrollLeft } = e.target;
      setScrollPosition(scrollLeft);
    };

    const scrollDown = () => {
      const nextScrollPosition = scrollPosition + 100; // Adjust this value to control the scroll amount
      document.getElementsByClassName('forecast-container')[0].scrollTo({
        top: nextScrollPosition,
        behavior: 'smooth'
      });
    };
  
    const scrollUp = () => {
      const nextScrollPosition = scrollPosition - 100; // Adjust this value to control the scroll amount
      document.getElementsByClassName('forecast-container')[0].scrollTo({
        top: nextScrollPosition,
        behavior: 'smooth'
      });
    };


    const navigate = useNavigate();

  const homePage = () => {
    // Navigate to a new route
    navigate('/home');


  }


 

  if (!res || !res.hourly) {
    return null; // Display a message when forecast data is not available
  }


  
  return (
    <div>

    <div className="mx-auto max-w-screen-sm mt-5 px-5 bg-custom-blue">
      <div className="flex items-center justify-start my-6 px-6 pt-5">
        <button onClick={homePage} className="flex items-center">
          <UilAngleLeft className="mr-2" />
          &nbsp;&nbsp;
          <p className="back">Back</p>
        </button>
      </div>
    

    <div className='flex items-center justify-around mt-6 text-white'>
        <p></p>Today
        <p className='pl-96'> {formatDate(dt,res.timezone)}</p>
    </div>

    <div className='flex flex-row items-center justify-between text-white pl-12 pt-10'>

        {res.hourly.map((item)=>
        (
        <div className='flex flex-col items-center justify-center'>
            <p className='font-semibold text-sm'>
                {`${item.temp.toFixed()}`}&deg;C
            </p>
            <img src={iconUrlFromCode(item.icon)} className='w-12 my-1' />
            <p className='font-medium'>{item.title}</p>
        </div>
        ))}

       

    </div>

    <div className='flex flex-row items-center justify-around mt-6 text-white pt-16'>
<p className='pl-8'>Next Forecast</p>
<p className='pl-80'> {formatDate(dt,res.timezone)}</p>
</div>
 <div className='forecast-container overflow-y-scroll h-32 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 '>
            {res.daily.map((item) => (
              <div className='flex items-center justify-around w-30 h-18 mr-2 '>
                
      <p className='text-left font-semibold text-sm pr-20 pl-7 text-white'>{item.title}</p>
      <img src={iconUrlFromCode(item.icon)} className='w-12 my-1' />
      <p className='text-right font-semibold text-sm pl-24 text-white'>{`${item.temp.toFixed()}`}&deg;C</p>
    </div>
   
            ))}
          </div>



{scrollPosition > 0 && (
          <button className="scroll-button top-1/2 transform -translate-y-1/2" onClick={scrollUp}>
            <span className="text-white text-2xl">&uarr;</span>
          </button>
        )}

        {scrollPosition < 100 && (
          <button className="scroll-button bottom-1/2 transform translate-y-1/2" onClick={scrollDown}>
            <span className="text-white text-2xl">&darr;</span>
          </button>
        )}


        </div>
      </div>
   
    

      


  )
}

export default Hourly;