import React from 'react'
import { loadingGif } from '../assets/index';

const LoadingPage = () => {
  return (
    <div className='flex items-center justify-center h-screen'>
        <img src={loadingGif} alt="Loading.." className='h-48 w-48' />
    </div>
  )
}

export default LoadingPage
