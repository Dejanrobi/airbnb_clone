import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { userGlobalContext } from '../context/UserContext';
import AddressLink from '../components/AddressLink';
import PlaceGallery from '../components/PlaceGallery';
import BookingDates from '../components/BookingDates';
import { differenceInCalendarDays, format } from 'date-fns';

const SingleBookingPage = () => {

    const { action } = useParams();
    const { getHeaders, loading, setLoading } = userGlobalContext();

    const [singleBooking, setSingleBooking] = useState(null);
    

    const getASingleBooking = ()=>{
      setLoading(true)
      if(action){

        
        axios.get(`/bookings/get-single-booking/${action}`, airbnbHeader).then(({data})=>{
          setSingleBooking(data) 
          console.log(data);

          
        }).catch((error)=>{
          console.log(error)
        })
      }

      setLoading(false)

    }

   
    

    const airbnbHeader = getHeaders();

    useEffect(()=>{
      if(action){
        getASingleBooking();
      }
      
     
    },[action])

    const checkIn = singleBooking?.checkIn;
    const checkOut = singleBooking?.checkOut;
  return ( 
    <>
      {singleBooking &&(
        <div>
          
          <h1 className=' text-3xl font-semibold'>{singleBooking?.placeId?.title}</h1>
          <AddressLink className="my-2 block">{singleBooking?.placeId?.address}</AddressLink>

          <div className='bg-gray-200 flex items-center justify-between p-4 mb-4 rounded-2xl'>
            <div>
              <h2 className='text-xl'>Your booking information:</h2>
              <BookingDates singleBooking={singleBooking}/>

            </div>
            
            <div className='bg-primary p-6 text-white rounded-2xl'>
              
              <div >Total Price</div>
              <div className='text-3xl'>${singleBooking.price*(differenceInCalendarDays(new Date(checkOut), new Date(checkIn)))}</div>
            </div>
            
          </div>

          <PlaceGallery place={singleBooking?.placeId}/> 
      </div>

      )}
    </>  
    
    
  )
}

export default SingleBookingPage
