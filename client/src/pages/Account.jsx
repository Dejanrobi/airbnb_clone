import React from 'react'

import { userGlobalContext } from '../context/UserContext'
import { Link, useNavigate, useParams }  from "react-router-dom"
import PlacesPage from './PlacesPage'
import BookingsPage from './BookingsPage'

const Account = () => {

    const { user, setLoading, setUser } = userGlobalContext()

    const navigate = useNavigate();

    // grabbing the subparams
    let { subpage } = useParams();

    if(subpage === undefined){
        subpage = 'profile'
    }

    // profile  == undefined

    function linkClasses(type=null){
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full'
        if(type === subpage){
            classes += ' bg-primary text-white '
        }else{
            classes += ' bg-gray-200'
        }
        return classes;
    }

    // logout function
    function logout(){
        localStorage.removeItem('https://www.airbnb.com/-token');
        // setLoading(true)      
        // window.location.reload();
        navigate("/");
        setUser(false)
        alert('Logout Successful');   
    }

  return (
    <>
        <div>
            <nav className='w-full flex justify-center mt-8 mb-8 gap-3'>
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>

                    My Profile
                </Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>

                    My bookings
                </Link>
                <Link className={linkClasses('places')} to={'/account/places'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                    </svg>

                    My Accommodations
                </Link>
            </nav>

            {
                subpage === 'profile' && (
                    <div className='text-center max-w-lg mx-auto'>
                        Logged in as {user.userName} ({user.userEmail}) <br/>
                        <button onClick={logout} className='primary max-w-sm mt-4'>Logout</button>
                    </div>
                )
            }

            {
                subpage === 'places' && (
                    <PlacesPage/>
                )
            }

            {
                subpage === 'bookings' && (
                    <BookingsPage/>
                )
            }
        </div>
    </>
    // <div>
    //   <p>Account page for {user.userName}</p>
    // </div>
  )
}

export default Account
