import React, { useState, useRef } from 'react';
import { GoogleMap, Marker, LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { UilArrowLeft } from '@iconscout/react-unicons'
import { UilSearch } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router';
const libraries = ['places']; // Define libraries as a constant variable
const units='metric'

const Search = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);
  const navigate=useNavigate();
  const [cityName,setCityName]=useState("");

  const handleMapClick = (e) => {
    const { latLng } = e;
    const lat = latLng.lat();
    const lng = latLng.lng();
    setSelectedLocation({ lat, lng });
    fetchCityName(lat, lng);
    // navigate("/home", { state: { cityName } });
  };

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places.length > 0) {
      const { location } = places[0].geometry;
      const lat = location.lat();
      const lng = location.lng();
      setSelectedLocation({ lat, lng });
      fetchCityName(lat, lng);
      navigate("/home",{ state: { cityName } });
    }
  };

  const fetchCityName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyAgs62EsgFH6WxA5Hx1yXcUBrAHslwn08U`
      );
      const data = await response.json();
      if (data.results.length > 0) {
        const cityName= data.results[0].address_components.find(
          (component) => component.types.includes('locality')
        )?.long_name;
        if (cityName) {
            setCityName(cityName);
          console.log('City Name:', cityName);
        } else {
          console.log('City name not found');
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
 

  const mapStyles = {
    height: '600px',
    width: '100%',
  };

  const defaultCenter = {
    lat: 37.7749, // Default latitude
    lng: -122.4194, // Default longitude
  };

  const back=async()=>
  {
    navigate("/home",{ state: { cityName } });
  }

  


  const sendCity = async () => {
    navigate("/home", { state: { cityName } });
  };

  return (
    <div>
      <div className="mx-auto max-w-screen-sm mt-5 px-5">
      {/* <div className="flex justify-start my-6 px-6 pt-5"> */}
        <LoadScript googleMapsApiKey="AIzaSyAgs62EsgFH6WxA5Hx1yXcUBrAHslwn08U" libraries={libraries}>
        <StandaloneSearchBox onLoad={(ref) => (searchBoxRef.current = ref)} onPlacesChanged={handlePlacesChanged}>
  <div className="relative w-full">
    <input type="text" placeholder="     Search..."  className="px-10 py-2 w-full bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
    <button className="absolute left-2 top-2" onClick={back}>
      <UilArrowLeft size={22} className="text-black-400" />
    </button>
    <button className="absolute right-2 top-2" onClick={sendCity}>
      <UilSearch size={18} className="text-black-400" />
    </button>

  </div>
</StandaloneSearchBox>
          <GoogleMap
            ref={(map) => (mapRef.current = map)}
            mapContainerStyle={mapStyles}
            zoom={8}
            center={defaultCenter}
            onClick={handleMapClick}
          >
            {selectedLocation && (
              <Marker position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }} />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
      {/* {selectedLocation && (
        <div>
          <h3>Selected Location</h3>
          <p>Latitude: {selectedLocation.lat}</p>
          <p>Longitude: {selectedLocation.lng}</p>
        </div>
      )} */}
    </div>
    
  );
};

export default Search;
