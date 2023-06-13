
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  // Your Firebase config here apiKey: "AIzaSyCxhnVm6ZaANQ6kUCrzQsd86SHmtZVaBjw",
  apiKey: "AIzaSyCxhnVm6ZaANQ6kUCrzQsd86SHmtZVaBjw",
  authDomain: "notify-f5add.firebaseapp.com",
  projectId: "notify-f5add",
  storageBucket: "notify-f5add.appspot.com",
  messagingSenderId: "691448929989",
  appId: "1:691448929989:web:80605d7b8e70060116daac",
  measurementId: "G-43H2NERBEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);


// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);

export{firebaseConfig}
