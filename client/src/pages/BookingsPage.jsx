import React, { useEffect, useState } from 'react';

import '../css/BookingsPage.css';

import { Link, useParams } from 'react-router-dom'
import { userGlobalContext } from '../context/UserContext';
import axios from 'axios';
import SingleBookingPage from './SingleBookingPage';
import PlaceImage from '../components/PlaceImage';
import { differenceInCalendarDays, format } from 'date-fns';
import BookingDates from '../components/BookingDates';



const BookingsPage = () => {

    const { action } = useParams();

    console.log("Action: ", action);
    const { getHeaders } = userGlobalContext();

    const [myBookings, setMyBookings] = useState([]);


    const getBookings=()=>{

        axios.get('/bookings/book-a-place', airbnbHeader).then(({data})=>{
            setMyBookings(data)
            console.log(data)
        })

    }

    const airbnbHeader = getHeaders();

    useEffect(()=>{
        if(location.pathname === '/account/bookings'){
            getBookings();
        }

    },[location.pathname])

  return (
    <>
        {
            !action &&(
                <div>
                    {
                        myBookings?.length>0 && myBookings.map((booking)=>(
                            <Link to={`/account/bookings/${booking._id}`} key={booking._id} className='flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mb-6'>
                                <div className='w-48 h-40'>
                                    <PlaceImage place={booking.placeId}/>
                                </div>

                                <div className='py-3'>
                                    <h2 className='text-xl font-semibold' >{booking.placeId.title}</h2>
                                    <BookingDates singleBooking={booking}/>
                                    
                                    
                                    <div className='mt-2 text-xl font-semibold flex gap-1 align-middle'>
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                            </svg>

                                        </div>
                                        
                                        <div>
                                            <span className=''>Total Price:</span> ${booking?.price *(differenceInCalendarDays(new Date(booking?.checkOut), new Date(booking?.checkIn)))}

                                        </div>
                                        
                                    </div>
                                    
                                </div>


                                
                            </Link>
                        ))
                    }
                </div>

            )
        }

        {

            !action &&(
                <div>
                    {
                        myBookings?.length<1 && (
                            <div className='no-bookings-div'>
                                <p>You have no bookings</p>
                            </div>
                        )
                    }
                </div>
            )

        }

        {
            action && (
                <SingleBookingPage/>
            )
        }
    </>

    
    
  )
}

export default BookingsPage
