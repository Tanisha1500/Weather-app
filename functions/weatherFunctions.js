const functions = require('firebase-functions');
const axios = require('axios');

exports.fetchWeatherAndSendNotification = functions.https.onRequest(async (req, res) => {
  try {
    // Make the API call to the weather API
    const weatherResponse = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: 'YOUR_API_KEY',
        q: 'Bangalore',
      },
    });

    // Retrieve the weather data
    const weatherData = weatherResponse.data;
    const { temperature, condition } = weatherData.current;

    // Customize the notification message based on the weather conditions
    let notificationMessage = '';
    if (condition.code === 1000) {
      notificationMessage = `The weather is clear with a temperature of ${temperature}°C.`;
    } else {
      notificationMessage = `The weather is ${condition.text} with a temperature of ${temperature}°C.`;
    }

    // Send the notification message to your React app
    // You can use Firebase Cloud Messaging to send the notification
    // You need to set up Firebase Cloud Messaging and configure it in your function

    res.status(200).send(notificationMessage);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Failed to fetch weather data');
  }
});
