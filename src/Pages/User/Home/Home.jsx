import React, { useEffect ,useState} from 'react'

import Header from '../../../components/user/Header/Header'
import ExploreMenu from '../../../components/user/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../../components/user/FoodDisplay/FoodDisplay'
import FeaturedFood from '../../../components/user/FeaturedFood/FeaturedFood'
import Works from '../../../components/user/Works/Works'
const Home = () => {
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      // Check if geolocation is supported by the browser
      if (!navigator.geolocation) {
        reject('Geolocation is not supported by your browser');
        return;
      }
  
      // Request the current position
      navigator.geolocation.getCurrentPosition(
        // Success callback
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          resolve(userLocation);
        },
        // Error callback
        (error) => {
          switch(error.code) {
            case error.PERMISSION_DENIED:
              reject('User denied the request for geolocation');
              break;
            case error.POSITION_UNAVAILABLE:
              reject('Location information is unavailable');
              break;
            case error.TIMEOUT:
              reject('The request to get user location timed out');
              break;
            case error.UNKNOWN_ERROR:
              reject('An unknown error occurred');
              break;
          }
        },
        // Options
        {
          enableHighAccuracy: true, // More accurate position
          timeout: 5000,           // Time to wait before error (5 seconds)
          maximumAge: 0            // Don't use cached position
        }
      );
    });
  };
const [Location,setlocation]=useState()
  useEffect(()=>{
    const fetchlocation=async()=>{
      const location=await getUserLocation()
       if(location){
        setlocation(location)
       }
    }
    fetchlocation()
  },[])
console.log(Location)
  return (
    <>
   
      <Header />
     
      <FeaturedFood />
      
      
      <Works />
</>
    
  )
}

export default Home
