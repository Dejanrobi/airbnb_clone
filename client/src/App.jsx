import React, { useState } from 'react' 
// Navbar
import Navbar from './components/Navbar' 
import './App.css'
import { Route, Routes, Navigate } from 'react-router-dom'

import MainPage from './pages/MainPage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'
import RegisterPage from './pages/RegisterPage';
import LoadingPage from './pages/LoadingPage';
import axios from "axios";

// importing the UserContextProvider
import { userGlobalContext } from './context/UserContext';
import Account from './pages/Account'
import PlaceMainPage from './pages/PlaceMainPage'

// pages
// baseURL
axios.defaults.baseURL = import.meta.env.VITE_API_BASEURL;


function App() {

  const { user, loading } = userGlobalContext(); 
  // console.log(loading)

  return (
   <>
    {
      loading?(
        <LoadingPage/>
      ):(
        <>
          {
              !user?(
                <Routes>
                  <Route path='/' element={ <Layout/> }>
                    
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='/register' element={<RegisterPage/>}/>
                    <Route path='/place/:id' element={<PlaceMainPage/>} />   

                    {/* Navigate back */}
                    
                    <Route path='/account' element={<Navigate to="/login"/>}/>
                    <Route path='/account/:subpage?' element={<Navigate to="/login"/>}/>
                    <Route path='/account/:subpage/:action' element={<Navigate to="/login"/>}/>  
                    
                  
                  </Route>
                </Routes>

              ):(
                <Routes>
                  <Route path='/' element={ <Layout/> }>
                    <Route path='/' element={<MainPage/>}/>
                    {/* add a question mark to make the account subpage optional either present or not but still displays */}
                    <Route path='/account/:subpage?' element={<Account/>}/>          
                    <Route path='/account/:subpage/:action' element={<Account/>}/>
                    <Route path='/place/:id' element={<PlaceMainPage/>} />          
                             
                                   {/* Navigate to  */}
                    <Route path='/login' element={<Navigate to="/"/>}/>
                    <Route path='/register' element={<Navigate to="/"/>}/>
                  </Route>
                </Routes>
              )
            }
        </>
      )
    }
   </>

    
      
      
      

    

  )
}

export default App
