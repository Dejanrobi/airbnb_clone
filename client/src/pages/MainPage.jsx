import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

import { userGlobalContext } from '../context/UserContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import LoadingPage from './LoadingPage'

import '../css/MainPage.css';

const MainPage = () => {
  const photoBaseUrl = import.meta.env.VITE_PHOTO_BASEURL

  const [allPlaces, setAllPlaces] = useState([])

  const [loadingPage, setLoadingPage] = useState(true)


  const getAllPlaces=async()=>{
    setLoadingPage(true);

    try {

      const { data } = await axios.get('/all-places');

      

      setAllPlaces(data);
      setLoadingPage(false);

      console.log("All Places: ",data);
      
    } catch (error) {
      console.log(error)
    }
    
  }

  useEffect(()=>{
    getAllPlaces();
  },[])

  const { user } = userGlobalContext();
  return (

    <>
      {loadingPage?<LoadingPage/>:(
        <div className='grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 lg:grid-cols-4 mt-10 main-page'>

     
        {
          allPlaces.length > 0 && allPlaces.map((place)=>(
            <Link to={`/place/${place._id}`} key={place._id}>
              <div className='bg-gray-500  rounded-2xl h-80 w-80'>
                {place.photos?.[0] &&(
                  <img className='rounded-2xl w-full h-full object-cover' src={`${photoBaseUrl}`+place.photos?.[0]} alt={place.title} />
                )}
              </div>

              <h2 className=' text-lg font-semibold mt-4  text-black text-opacity-90'>{place.title}</h2>
              <h2 className=' text-black text-opacity-70 '>{place.address}</h2>
              <div className='mt-1  text-black text-opacity-90'>
                <span className='font-semibold text-lg'>${place.price}</span> night
              </div>
              
            </Link>
          ))
        }
      </div> 

      )}
      
    

    

      
    </>
    
  )
}

export default MainPage
