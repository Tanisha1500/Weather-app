
import './App.css';
import UilReact from '@iconscout/react-unicons/icons/uil-react';

import {BrowserRouter, Routes, Route}from 'react-router-dom';
import Hourly from './components/Hourly';
import Home from './components/Home';
import Search from './components/Search';
// import { firebaseConfig } from './firebase';
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';
import { useEffect } from 'react';
import { getToken } from 'firebase/messaging';


// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);



function App(){
  useEffect(() => {
  //   if ('serviceWorker' in navigator) {
  //     navigator.serviceWorker
  //       .register('/firebase-messaging-sw.js')
  //       .then((registration) => {
  //         messaging.useServiceWorker(registration);
  //         console.log('Service Worker registered');
  //       })
  //       .catch((error) => {
  //         console.error('Service Worker registration failed:', error);
  //       });
  //   }
  // }, []);
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function(registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function(err) {
      console.log('Service worker registration failed, error:', err);
    });
  }
},[]);




  // const requestNotificationPermission = async () => {
  //   try {
  //     const permission = await Notification.requestPermission();
  //   if (permission === 'granted') {
  //     const messagingInstance = getMessaging();
  //     const token = await getToken(messagingInstance,{vapidKey:"BPnBWhC5fz76AkW1U9jdIe69eN4RBDvTaiYDVs8DeUZNxVngPr48TrgwdRAN4vGM51PHkjye8kQ2CEOcYIHheT0"});
  //     console.log('Notification permission granted.');
  //     console.log('Token:', token);
  //   } }catch (error) {
  //     console.error('Error:', error.message);
  //   }
  // };


  // useEffect(()=>
  // {
  //   requestNotificationPermission();},[]);
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/hourly" element={<Hourly/>}/>
      <Route exact path="/home" element={<Home/>}/>
      <Route exact path='/search' element={<Search />}/>
      <Route exact path="/back" element={<Home/>}/>

    </Routes>
    </BrowserRouter>
    </>
    
    
  );
}

export default App;
