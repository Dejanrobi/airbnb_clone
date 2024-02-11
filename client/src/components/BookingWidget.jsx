import React, { useEffect, useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'

import { userGlobalContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const BookingWidget = ({place}) => {

    const { user,getHeaders } = userGlobalContext();


    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    let numberOfNights = 0;
    if(checkIn && checkOut){
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    
    useEffect(()=>{
        if(user){
            setName(user.userName)
        }
        // console.log({user})

    },[user])
    
    // console.log("Airbnb header: ", airbnbHeader)

    // Navigation
    const navigate = useNavigate();


    // book a place function
    const bookAPlace= async()=>{
        console.log("AirbnbHeader: ", airbnbHeader)
        const placeId = place._id
        const price = place.price
        const bookingData ={
            placeId, checkIn, checkOut, numberOfGuests, name, email, price
        }
        try {
            const {data}= await axios.post('/bookings/book-a-place', bookingData, airbnbHeader);
            
            const bookingId = data._id
            
            console.log(data)
            
            // navigate to
            navigate(`/account/bookings/${bookingId}`);
            
        } catch (error) {
            console.log(error)
        }
    }

    const airbnbHeader = getHeaders();

  return (
    <div className=' shadow p-6 rounded-2xl border border-gray-300'>
        <p className='text-lg'><span className=' text-2xl font-semibold'>${place.price}</span> per night</p>               
        
        <div className='my-4 border border-gray-500 rounded-xl'>
            <div className='grid grid-cols-2 border-b border-b-gray-500'>
                <div className='py-3 px-4'>
                    <label htmlFor="" className='font-semibold text-sm'>CHECK IN</label>
                    <input  type="date" name="checkin" id="checkin" value={checkIn} onChange={(e)=> setCheckIn(e.target.value) } />
                </div>
                
                <div className='py-3 px-4 border-l border-l-gray-500'>
                    <label htmlFor="" className='font-semibold text-sm'>CHECK OUT</label>
                <input  type="date" name="checkout" id="checkout" value={checkOut} onChange={(e)=> setCheckOut(e.target.value)} />
                </div>

            </div>
            <div className='py-3 px-4'>
                <label htmlFor="" className='font-semibold text-sm'>NUMBER OF GUESTS</label>
                <input type="number" min={1}  value={numberOfGuests} onChange={(e)=>setNumberOfGuests(e.target.value)} />

            </div>

            {
                numberOfNights > 0 && (
                    <div className=' py-3 px-4 border-t border-t-gray-500'>
                        <div className=''>
                            <label htmlFor="" className='font-semibold text-sm'>FULL NAME</label>
                            <input type="text"  value={name} placeholder='John Doe' onChange={(e)=>setName(e.target.value)} />

                        </div>

                        <div className=''>
                            <label htmlFor="" className='font-semibold text-sm'>EMAIL</label>
                            <input type="email"  value={email} placeholder='dejanrobi79@gmail.com' onChange={(e)=>setEmail(e.target.value)} />

                        </div>
                    </div>
                    



                )
            }

        </div>
        
        <button onClick={bookAPlace}  className='primary'>
            Book this place 
            {
                numberOfNights > 0 && (
                    <span> for {numberOfNights} {
                        numberOfNights === 1 ?<span> Night</span> : <span> Nights</span>
                    }</span>
                    
                )
            }
            
        
        </button>

        <div >
            {
                numberOfNights > 0 &&(
                    <div className=' flex justify-between text-lg my-6 font-semibold'>
                        <div><span>${place.price} x <span> {numberOfNights} {
                        numberOfNights === 1 ?<span> Night</span> : <span> Nights</span>
                    }</span></span></div>
            <div>${numberOfNights * place.price}</div>

                    </div>
                    

                )
            }
            
        </div>
    </div>
  )
}

export default BookingWidget
