import React from 'react'
import { loadingGif } from '../assets/index';

import '../css/LoadingPage.css';

const LoadingPage = () => {
  return (

    
      <div className='loading-div  '>

        <img src={loadingGif} alt="Loading.." className='h-28 w-28
        ' />
     
        
      </div>

   
    
  )
}

export default LoadingPage
