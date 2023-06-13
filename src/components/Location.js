import React from 'react'
import { UilAngleDown } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router';

function Location({weather})
 {
  const navigate=useNavigate();
  const searchPage= () => {

    // Navigate to a new route
    navigate({
      pathname:'/search',
      
    });
  };

    if (!weather || !weather.name) {
        return null;
    }
  return (
    <div className='flex items-center justify-centre mt-10'>
        <p className='text-custom-white text-xl font-light'> 
        {weather.name}, {weather.country}
        
        </p>
        <button className='pl-1 text-white' onClick={searchPage}>
        <UilAngleDown></UilAngleDown>
        </button>

    </div>
  )
}
 

export default Location;