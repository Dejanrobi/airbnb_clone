import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userGlobalContext } from '../context/UserContext'
import axios from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  // userGlobalContext
  const { user, setUser, setLoading } = userGlobalContext()
  const navigate = useNavigate();

  const loginUser =async (e)=>{
    e.preventDefault();

    
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password
        
      })  
      
      if(data){
        localStorage.setItem('https://www.airbnb.com/-token', data.token)
        // alert('Login Successful');    
        // setLoading(true)      
        navigate('/')
        window.location.reload();
      }
      

              
    } catch (error) {
      alert(error.response.data.msg);
      // console.log(error.response.data.msg)      
    }
  }

 


  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-24'>
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
          <button type='submit' className='primary'>Login</button>
          <div className="text-center py-8 text-gray-500">
            Don't have an account? <Link className='underline text-black' to={'/register'}>Register</Link>
          </div>
        </form>

      </div>
      
      
    </div>
  )
}

export default LoginPage
