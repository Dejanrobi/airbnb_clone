import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userGlobalContext } from '../context/UserContext'

import '../css/LoginPage.css';
import axios from 'axios'
import { loadingTwoGif } from '../assets';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const [loadingButton, setLoadingButton] = useState(false);

  // userGlobalContext
  const { user, setUser, setLoading } = userGlobalContext()
  const navigate = useNavigate();

  const loginUser =async (e)=>{
    e.preventDefault();
    setLoadingButton(true);

    // console.log("Email: ", email);
    // console.log("Password:", password);

    
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password
        
      })  
      
      if(data){
        localStorage.setItem('https://www.airbnb.com/-token', data.token)
        // alert('Login Successful');    
        // setLoading(true)      
        setLoadingButton(false);
        navigate('/account')
        window.location.reload();
        
      }
      

              
    } catch (error) {
      alert(error.response.data.msg);
      setLoadingButton(false);
      console.log(error.response.data.msg)      
    }
  }

 


  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-24'>
        <div className='test-account'>
          <p><strong>TEST ACCOUNT</strong></p>
          <p><strong>EMAIL: </strong>mistanojames12@gmail.com</p>
          <p><strong>PASSWORD: </strong>123456</p>
        </div>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        
        <p>{user.user}</p>
        <form className='max-w-md mx-auto' onSubmit={loginUser}>
          <input 
            type="email" 
            placeholder='your@email.com' 
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
          />
          <input 
            type="password" 
            placeholder='password' 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />

          {
            loadingButton?(
              <button  disabled className='primary disabled-button'>
                <img src={loadingTwoGif} alt="" />
              </button>
            ):(
              <button type='submit' className='primary'>Login</button>
            )
          }
          
          
          <div className="text-center py-8 text-gray-500">
            Don't have an account? <Link className='underline text-black' to={'/register'}>Register</Link>
          </div>
        </form>

      </div>
      
      
    </div>
  )
}

export default LoginPage
