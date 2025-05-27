import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'


import axios from 'axios';
import BookingWidget from '../components/BookingWidget';
import PlaceGallery from '../components/PlaceGallery';
import AddressLink from '../components/AddressLink';
import LoadingPage from './LoadingPage';

const PlaceMainPage = () => {
    const photoBaseUrl = import.meta.env.VITE_PHOTO_BASEURL

    // console.log(photoBaseUrl)

    const [place, setPlace] = useState({});

    const [loadingPage, setLoadingPage] = useState(true);
    

    const [smallIndex, setSmallIndex] = useState(0)

    const {id} = useParams();

    // get the place details

    const getPlaceDetails=async ()=>{

        setLoadingPage(true)
        try {
            const { data } = await axios.get(`/get-a-single-place/${id}`)

            setPlace(data);
            setLoadingPage(false);
            console.log(data)
        } catch (error) {
            console.log(error)
            
        }

    }

    useEffect(()=>{
        if(!id){
            return
        }
        getPlaceDetails();

    },[])

    useEffect(()=>{
        if(!id){
            return
        }
        getPlaceDetails();

    },[id])



  return (

    <>

        {
            loadingPage?<LoadingPage/>:(
                <div className='mt-4   py-4'>
                    <h1 className=' text-3xl font-semibold'>{place.title}</h1>
                    <AddressLink>
                        {place.address}
                    </AddressLink>
                    
                    <PlaceGallery place={place}/>
                

                    <div className='grid gap-x-20 gap-y-8 grid-cols-[2fr_1fr] my-8'>
                        <div>
                            <div className=''>
                                <h2 className='font-semibold text-2xl mb-3'>Description</h2>
                                <p>{place.description}</p>
                            </div>
                            <div className='my-8'>
                                <p>Check-in: {place.checkIn}</p>
                                <p>Check-out: {place.checkOut} </p>
                                <p>Max number of guests: {place.maxGuests} </p>
                            
                            </div>

                        </div>
                        
                        <div>
                            <BookingWidget place={place}/>

                        </div>
                    
                    </div>

                    <div>

                        <h2 className='font-semibold text-2xl mb-3'>Extra Information</h2>
                        <p>{place.extraInfo}</p>

                    </div>

                
                </div>
            )
        }


    </>
    
  )
}

export default PlaceMainPage
