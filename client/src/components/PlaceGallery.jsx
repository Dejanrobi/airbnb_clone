import React, { useState } from 'react'

const PlaceGallery = ({place}) => {
    const photoBaseUrl = import.meta.env.VITE_PHOTO_BASEURL

    const [showAllPhotos, setShowAllPhotos] = useState(false);

    if(showAllPhotos){
        return (
            <div className='absolute inset-0 bg-black  min-h-screen py-8'>
                <div className=' py-8 grid gap-6 bg-black'>
                    <div className='flex justify-between fixed top-0 left-0 right-0 px-8 py-4 bg-black'>
                        <button className=' flex gap-2 bg-white text-black font-semibold px-4 py-2 rounded-2xl' onClick={()=> setShowAllPhotos(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                            </svg>

                            Close photos

                        </button>
                        
                        <div className='flex gap-6'>
                            <div className=' cursor-pointer flex gap-2 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                                </svg>
                                <p className=' underline'>Share</p>

                            </div>

                            <div className=' cursor-pointer flex gap-2 text-white'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                </svg>
                                <p className=' underline'>Save</p>

                            </div>

                        </div>
                        
                    </div>
                    <div className='flex items-center justify-center mt-20 bg-black'>
                        <div className=' flex gap-6 flex-wrap w-3/5 h-full justify-center align-middle '>
                            {
                                place?.photos?.length > 0 && place?.photos?.map((photo, index)=>(
                                    <div 
                                        key={index}
                                        className={"w-full h-[75vh]"}
                                    >
                                        <img className='w-full h-full object-cover' src={`${photoBaseUrl}${photo}`} alt={photo.title} />                                                
                                    </div>
                                    
                                    

                                    

                                )

                                    
                                )   
                                
                            }

                        </div>

                    </div>

                   
                    

                </div>
                
                
          

            </div>
                
            
            
        )
    }
  return (
    <div className='relative'>
        <div className='grid gap-8 grid-cols-[1fr_1fr] mt-6 rounded-3xl overflow-hidden'>
            <div className='w-full h-96'>
                {
                    place?.photos?.[0] &&(
                        <img onClick={()=>setShowAllPhotos(true)}  className=' cursor-pointer w-full h-full object-cover ' src={`${photoBaseUrl}${place?.photos[0]}`} alt="" />
                    )
                }
            </div>
            <div className='grid gap-x-8 gap-y-8 grid-cols-[1fr_1fr]'>
                <div className='w-full h-44'>
                    {
                        place?.photos?.[1] &&(
                            <img onClick={()=>setShowAllPhotos(true)}  className=' cursor-pointer w-full h-full object-cover ' src={`${photoBaseUrl}${place?.photos[1]}`} alt="" />
                        )
                    }
                </div>

                <div className='w-full h-44'>
                    {
                        place?.photos?.[2] &&(
                            <img onClick={()=>setShowAllPhotos(true)}  className=' cursor-pointer w-full h-full object-cover ' src={`${photoBaseUrl}${place?.photos[2]}`} alt="" />
                        )
                    }
                </div>
                
                <div className='w-full h-44'>
                    {
                        place?.photos?.[3] &&(
                            <img onClick={()=>setShowAllPhotos(true)}  className=' cursor-pointer w-full h-full object-cover ' src={`${photoBaseUrl}${place?.photos[3]}`} alt="" />
                        )
                    }
                </div>
                
                <div className='w-full h-44'>
                    {
                        place?.photos?.[3] &&(
                            <img onClick={()=>setShowAllPhotos(true)}  className=' cursor-pointer w-full h-full object-cover ' src={`${photoBaseUrl}${place?.photos[3]}`} alt="" />
                        )
                    }
                </div>

                <button onClick={()=> setShowAllPhotos(true)} className='absolute bottom-5 right-6 bg-white border border-black px-4 py-2 rounded-lg font-semibold flex gap-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z" clipRule="evenodd" />
                    </svg>

                    <p>Show all photos</p>
                    
                    
                </button>
                
                

                
            </div>

        </div>

    </div>

  )
}

export default PlaceGallery
