import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'

import axios from 'axios';

const RegisterPage = () => {
  // user details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  // register user function
  const registerUser= async(e)=>{
    e.preventDefault();
    

    //  registering the user
    try {
      const { data } = await axios.post('/auth/register', {
        name,
        email,
        password
      })  
      
      // console.log(registered);
      if(data){
        localStorage.setItem('https://www.airbnb.com/-token', data.token)
        alert('Registration Successful');
        
        window.location.reload();
      }
      
    } catch (error) {
      alert(error.response.data.msg);
      // console.log(error)
      
    }
    
    

  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-24'>
        <h1 className='text-4xl text-center mb-4'>Register</h1>
        
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input type="text" 
            placeholder='Dejan Robi' 
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
          />
          <input type="email" 
            placeholder='your@email.com' 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <input type="password" 
            placeholder='password' 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <button type='submit' className='primary'>Register</button>
          <div className="text-center py-8 text-gray-500">
            Already have an account? <Link className='underline text-black' to={'/login'}>Login</Link>
          </div>
        </form>

      </div>
      
      
    </div>
  )
}

export default RegisterPage
