// import { getMessaging, onBackgroundMessage } from 'firebase/messaging';
// import { initializeApp } from 'firebase/app';


// const firebaseConfig = {
//   // Your Firebase config here
//   apiKey: "AIzaSyCxhnVm6ZaANQ6kUCrzQsd86SHmtZVaBjw",
//   authDomain: "notify-f5add.firebaseapp.com",
//   projectId: "notify-f5add",
//   storageBucket: "notify-f5add.appspot.com",
//   messagingSenderId: "691448929989",
//   appId: "1:691448929989:web:80605d7b8e70060116daac",
//   measurementId: "G-43H2NERBEF"
// };

// const app= initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// messaging.onBackgroundMessage((payload) => {
//   console.log('Received background message:', payload);
//   // Customize the handling of the background message here
//   // For example, display a notification
//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     // serviceWorkerRegistrationOptions: {
//     //   scope: '/firebase-cloud-messaging-push-scope',
//     // },
//   };
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
  .then(function(registration) {
    console.log('Registration successful, scope is:', registration.scope);
  }).catch(function(err) {
    console.log('Service worker registration failed, error:', err);
  });
}