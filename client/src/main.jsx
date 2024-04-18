import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from './context/UserContext';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if (import.meta.env.NODE_ENV  === 'production') disableReactDevTools()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>    
    <BrowserRouter>     
      <UserContextProvider>
        <App />
      </UserContextProvider>        
    </BrowserRouter>     
  </React.StrictMode>,
)
