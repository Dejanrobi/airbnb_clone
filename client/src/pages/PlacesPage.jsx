import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import AddPlacePage from './AddPlacePage';
import { userGlobalContext } from '../context/UserContext';
import axios from 'axios';
import PlaceImage from '../components/PlaceImage';
import LoadingPage from './LoadingPage';

// CSS
import '../css/PlacesPage.css';


const PlacesPage = () => {

  const { action } = useParams();
  console.log(action)
  const { getHeaders } = userGlobalContext();
  
  const airbnbHeader = getHeaders();

  const [myAccommodations, setMyAccommodations] = useState()


  
  // console.log(myAccommodations)

  const getMyAccommodations = ()=>{
    axios.get('/places/my-accommodations', airbnbHeader).then(({data})=>{
        setMyAccommodations(data)
        // console.log(data)
    })

  }

  // obtaining the added places from the server
  useEffect(()=>{
    if(location.pathname === '/account/places'){
      getMyAccommodations();
    }
    
  },[location.pathname])

  
  return (
    <>
      {
        !action &&(
          <>
            <div className="text-center mt-8">

          
              <Link className='bg-primary inline-flex gap-2 text-white py-2 px-6 rounded-full' to={'/account/places/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>

                Add a new place
              </Link>
            </div>

            <div className=' mt-8 my-accommodations-container main-padding-left-right'>

              {/* <LoadingPage/> */}
               {
                myAccommodations&&(
                  <>
                    {
                      myAccommodations.length > 0 && myAccommodations.map((accommodation)=>(
                        <Link to={'/account/places/'+accommodation._id} className='flex gap-4 single-accommodation-div bg-gray-100 mb-4 p-4 rounded-2xl' key={accommodation._id}>
                          <div className=' rounded-2xl  single-my-accommodation-image  bg-gray-300 grow-0 shrink-0'>
                            {
                              accommodation.photos.length > 0 &&(
                                
                                <PlaceImage place={accommodation} className={'rounded-2xl'} />
                              )
                            }
                          </div>
                          
                          <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{accommodation.title}</h2>
                            <p className='text-sm mt-2'>{accommodation.description}</p>

                          </div>
                          
                          
                        </Link>
                      ))
                    }


                  </>
                )
              } 
              

            </div>
          </>
          

          
          
          
        )
      }

      {
        action === "new" &&(
          <AddPlacePage/>
        )
      }

      {
        action && action !== "new" &&(
          <AddPlacePage/>
        )
      }

      


    </>
    
    
  )
}

export default PlacesPage
