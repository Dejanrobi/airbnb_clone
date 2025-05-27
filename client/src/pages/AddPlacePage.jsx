import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Perks from '../Perks';
import axios from 'axios'
import { userGlobalContext } from '../context/UserContext';
import PhotosUploader from '../PhotosUploader';
import { loadingTwoGif } from '../assets';


const AddPlacePage = () => {

    const { getHeaders } = userGlobalContext();

    const [saveLoadBtn, setSaveLoadBtn] = useState(false);

    const { action } = useParams();
    const [title, setTitle] = useState();
    const [address, setAddress] = useState();
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState();
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [maxGuests, setMaxGuests] = useState();
    const [price, setPrice] = useState();
  
    const [redirect, setRedirect] = useState('');
  
    const navigate = useNavigate();
    // const history = useHistory();

    const fetchASingleAccommodation=()=>{
      axios.get(`/places/my-accommodations/${action}`, airbnbHeader).then((response)=>{
        
        const { data } = response;

        console.log(data)

        setTitle(data.title)
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      })

    }


    useEffect(()=>{
      if(action || action !== 'new'){
        fetchASingleAccommodation();
      }   
    }, [action])
  
    function inputHeader(text){
      return (
        <h2 className='text-2xl mt-4'>{text}</h2>
      )
    }
  
    function inputDescription(text){
      return (
        <p className='text-gray-500 text-sm mt-1 mb-2'>{text}</p>
      )
    }
  
    function preInput(header, description){
      return (
        <>
          {inputHeader(header)}
          {inputDescription(description)}
        </>
      )
    }
  
    // , {link: photoLink}
    const airbnbHeader = getHeaders();
  
    async function addPhotoByLink(e){
      e.preventDefault();

      
      
      
      try {
        // request url, request data, request header
        // rename data to filename
        const {data:filename} = await axios.post('/places/upload-by-link', {link: photoLink}, airbnbHeader)
        
        setAddedPhotos((prev)=>{
          return [...prev, filename]
        })
  
        setPhotoLink('');

        
        
      } catch (error) {
        console.log(error)
        
      }
      // console.log("Airbnb header: ",getHeaders())
      
      
    }
  
  
  
  
    const uploadPhoto=async(e)=>{
  
      const newUploadHeader = {
        headers:{
          'Content-type':'multipart/form-data',
          Authorization: `${airbnbHeader.headers.Authorization}`
        }
      }
  
  
      //the files are inside the event.
      // grabbing the files
      const files = e.target.files;
  
      const newFormData = new FormData();
  
      for(let i=0; i<files.length; i++){
        newFormData.append('photos', files[i])
      }
      
      // console.log("Form Data: ", newFormData)
  
      try {
        
        const { data:filenames }  = await axios.post('/places/upload-file', newFormData, newUploadHeader)
  
        // console.log(filenames)
        setAddedPhotos((prev)=>{
          return [...prev, ...filenames]
        })
        
      } catch (error) {
        console.log(error)     
      }
      
    }
  
    const savePlace=async(e)=>{
      e.preventDefault();
      // console.log("form submitted")
      setSaveLoadBtn(true);
  
      // submitting the data
      const placeData = {
        title, address, addedPhotos,
        description, perks, extraInfo,
        checkIn, checkOut, maxGuests, price
      }
      

      if(action && action!=="new"){

        try {
          const{data:responseData}=await axios.patch(`/places/my-accommodations/${action}`, placeData, airbnbHeader)
    
          console.log(responseData)
          navigate('/account/places');
          // history.push('/places/account');
          setSaveLoadBtn(false);
          
        } catch (error) {
    
          console.log(error)
          setSaveLoadBtn(false);
          
        }  

      }else if(action === "new"){
        try {
          const{data:responseData}=await axios.post('/places/my-accommodations', placeData, airbnbHeader)
    
          // console.log(responseData)
          navigate('/account/places');
          // history.push('/places/account');
          setSaveLoadBtn(false);
          
        } catch (error) {
    
          console.log(error)
          setSaveLoadBtn(false);
          
        }  

      }
      
    }


    
  
  return (
    <div>
        <div>
            <form onSubmit={savePlace}>
              {preInput('Title', 'Title for your place. Should be short and catchy')}              
              <input type='text' value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='title, for example: My Lovely Apartment'/>

              {preInput('Address', 'Address to this place')}
              <input type='text' value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='address'/>

              {preInput('Photos', 'More = Better')}
              
              <PhotosUploader uploadPhoto={uploadPhoto} addPhotoByLink={addPhotoByLink} addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} photoLink={photoLink} setPhotoLink={setPhotoLink}  />

              {preInput('Description', 'description of the place')}
              <textarea 
                value={description} 
                onChange={(e)=> setDescription(e.target.value)}/>

              {preInput('Perks', 'Select all the perks of your place')}
              
              <div className='grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6'>
                <Perks selected={perks} onChange={setPerks}/>
                
              </div>

              {preInput('Extra info', 'house rules, etc')}
              <textarea 
                value={extraInfo} 
                onChange={(e)=> setExtraInfo(e.target.value)}/>

              {preInput('Check in & out times, max guests', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
              <div className='grid gap-2 sm:grid-cols-3'>
                <div>
                  <h3 className='mt-2 -mb-1'>Check in time</h3>
                  <input type="text" 
                    value={checkIn} 
                    onChange={(e)=> setCheckIn(e.target.value) } 
                    placeholder='14' />
                </div>
                <div>
                  <h3 className='mt-2 -mb-1'>Check out time</h3>
                  <input type="text" 
                    value={checkOut} 
                    onChange={(e)=>setCheckOut(e.target.value)} 
                    placeholder='11' />
                </div>
                <div>
                  <h3 className='mt-2 -mb-1'>Max number of guests</h3>
                  <input type="text" 
                    value={maxGuests} 
                    onChange={(e)=>setMaxGuests(e.target.value)}/>
                </div>                
              </div>

              {preInput('Price', 'This is the Price per Night')}
              <input type='number' value={price} onChange={(e)=> setPrice(e.target.value)} placeholder='Price'/>

              <div>
                {
                  saveLoadBtn?(
                    <button type='submit' className='primary my-4 disabled-button'>
                      <img src={loadingTwoGif} alt="" />
                    </button>
                  ):(
                    <button type='submit' className='primary my-4'>Save</button>
                  )
                }
                
                
              </div>
            </form>
          </div>
    </div>
  )
}

export default AddPlacePage
