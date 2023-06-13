import React, { useEffect, useState } from 'react'
import UilReact from '@iconscout/react-unicons/icons/uil-react';    //npm i
import Temparature from './Temperature';
import Input from './Input';
import Location from './Location';
import  { iconUrlFromCode } from '../services/weatherServices';
// import getFormattedWeather from '../services/weatherServices';
import Hourly from './Hourly';
import axios from 'axios';import { UilBell } from '@iconscout/react-unicons'

import { useLocation } from 'react-router';
import 'react-toastify/dist/ReactToastify.css';
// import { messaging,onMessage,firebaseConfig } from '../firebase';
import { getMessaging } from 'firebase/messaging';
import { getToken } from '@firebase/messaging';
import { onMessage } from '@firebase/messaging';
import { initializeApp } from '@firebase/app';
import io from 'socket.io-client';

import { Messaging } from '@firebase/messaging';
import { firebaseConfig } from '../firebase';


const app = initializeApp(firebaseConfig);

// Get the messaging instance
const messaging = getMessaging(app);



const socket = io.connect('http://localhost:3000');

function Home() {

    const[query,setQuery]=useState({q:'Bangalore'})           //Setting the default city as Bangalore
    const [units,setUnits]=useState('metric')                 //Setting the unit to be celsius
    const [weather,setWeather]=useState(null)
    const [notification,setNotification] = useState('');
    const [showNotification,setShowNotification]=useState(false);
    const [open, setOpen] = useState(false);
    const [time,setTime]=useState(new Date());
    
    

  
    const location = useLocation();
     

    // const requestNotificationPermission = async () => {
    //   try {
    //     const permission = await Notification.requestPermission();
    //   if (permission === 'granted') {
    //     const messagingInstance = getMessaging();
    //     const token = await getToken(messagingInstance,{vapidKey:"BPnBWhC5fz76AkW1U9jdIe69eN4RBDvTaiYDVs8DeUZNxVngPr48TrgwdRAN4vGM51PHkjye8kQ2CEOcYIHheT0"});
    //     console.log('Notification permission granted.');
    //     console.log('Token:', token);

    //     await axios.post('http://localhost:3000/subscribe', {
    //       token,
    //       topic: 'weather-updates',
    //     });
    //     console.log('Subscribed to topic successfully.');
    //   }
    //   } catch (error) {
    //     console.error('Error:', error.message);
    //   }
    // };
    // const handleBellButtonClick = () => {
    //   requestNotificationPermission();
    //   setNotification('This is a notification message');
    //   setShowNotification(true);
    // };
        
  

     

    useEffect(() => {
      setQuery(location.state && location.state.cityName ? { q: location.state.cityName } : { q: 'Bangalore' });
    }, [location.state]);
    
    
    
    
    useEffect(() => {
      const fetchWeather = async () => {
        try {
         
          const response = await axios.get('http://localhost:3000/weather', {params: { city: query.q,units: units }});

          const data = response.data;
          console.log(data);
          setWeather(data);
         
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
  
      fetchWeather();
    }, [query]);
     console.log(query.q);

    //  useEffect(() => {const sendDailyNotification = async () => {
    //   try {
    //     await axios.get('http://localhost:3000/notification', {params: { city: query.q,units: units }});
    //     console.log('Daily notification sent');
    //   } catch (error) {
    //     console.error('Error sending daily notification:', error);
    //   }
    // };
      
  
    //   sendDailyNotification();
    // }, []);


    // useEffect(() => {
    //   // Listen for the 'notification' event from the WebSocket server
    //   socket.on('send-message', (data) => {
    //     alert(data.message);
    //     // setNotification();
        
    //   });
    // }, []);
  
    const handleBellButtonClick = () => {
      socket.emit('notificationRequest',{message:"HEY"}); // Send a request to the server for a notification
      socket.on('send-message', (data) =>
       {
        const { message, timestamp } = data;
        
        setNotification(message);
        setTime(new Date());
        setShowNotification(true);
        setTimeout(() => {
          setShowNotification(false);
        }, 10000);
        
      }
      );
    }





    
  
    

  return (



<div className="mx-auto max-w-screen-sm mt-5 px-5 bg-custom-blue rounded-3xl">
  <div className='flex items-baseline justify-left my-2 px-6'>
    &nbsp; &nbsp;
    <Input />
    &nbsp; &nbsp; &nbsp;
    <Location weather={weather} />
    
    <div className="relative">
<button className="pl-80 text-white" onClick={handleBellButtonClick}>
          <UilBell></UilBell>
          </button>
          </div>
          {/* {open && (
            <div className="absolute w-44 left-60 bg-white text-black font-light rounded-lg shadow-md mt-2 p-4">
              {displayNotification()}
              <button className="nButton">Mark as read</button>
            </div>
          )} */}
          {showNotification && (
        <div className="absolute right-96 top-20 bg-white text-black font-light rounded-lg shadow-md mt-2 p-4">
          <div>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
          <div>{notification}</div>
        </div>
          )}
      {/* )} */}
  </div>
  


  {weather && weather.icon && (
    <div className='flex justify-center mt-2'>
      <img className='h-64 w-64' src={iconUrlFromCode(weather.icon)} alt="Weather Icon" />
    </div>
  )}

  <div className='px-7 mx-auto max-w-xs mt-2 bg-light-blue rounded-lg border border-white border-opacity-0'>
    <Temparature weather={weather} units={units} />
  </div>

  
      </div>
      
  );
}

 

export default Home;