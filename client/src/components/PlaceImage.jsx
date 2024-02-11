import React from 'react'

const PlaceImage = ({place, index=0, className=null}) => {
    const photoBaseUrl = import.meta.env.VITE_PHOTO_BASEURL

if(!place.photos?.length){
    return '';
}

if(!className){
    className= 'h-full w-full object-cover';
}else{
    className+=' h-full w-full object-cover'
}
return (
    
        <img className={className} src={`${photoBaseUrl}${place.photos[index]}`} alt={place.title} />
   
      
    
  )
}

export default PlaceImage
