import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { userGlobalContext } from '../context/UserContext';


// import css
import '../css/Navbar.css';
import axios from 'axios';


const Navbar = () => {

  const photoBaseUrl = import.meta.env.VITE_PHOTO_BASEURL

  const { user } = userGlobalContext();

  const [allSearches, setAllSearches] = useState([]);
  const [searchedItems, setSearchedItems] = useState([]);

  const [searchItem, setSearchItem] = useState("");


  const getAllSearches=async()=>{
    try {

      const { data } = await axios.get('/all-places');

      

      setAllSearches(data);
      

      console.log("All Searches: ",data);
      
    } catch (error) {
      console.log(error)
    }
  }



  const getSearchedItems=()=>{
    // console.log("Searched Item: ", searchItem);

    const finalSearch = () => {
      return allSearches.filter(item =>
        typeof item?.title === "string" &&
        item.title.toLowerCase().includes(searchItem.toLowerCase())
      );
    };

    setSearchedItems(finalSearch)

    // console.log("Searched Items: ", searchedItems);
    // console.log()
    // console.log("Final Search: ", finalSearch());
  }


  useEffect(()=>{
    getAllSearches();
  },[])

  useEffect(()=>{
    getSearchedItems();
  },[searchItem])


  const searchRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchItem("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  



  return (
    <header className=' navbar-section main-padding-left-right'>
        <Link to={'/'} className='flex items-center gap-1'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 -rotate-90">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
          </svg>

          <span className='font-bold text-xl airbnb-nav-text'>airbnb</span>
        </Link>

        <div className='flex items-center  gap-3 border border-gray-300 rounded-full py-1 px-6 shadow-md shadow-gray-200 nav-search-div'>
          <input placeholder='Search' type="text" className='nav-search-input' 
           value={searchItem}
           onChange={(e)=>{
            setSearchItem(e.target.value)
           }}
          />
          <button className='bg-primary text-white p-2 rounded-full' onClick={getSearchedItems}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          {
            searchItem&&(
               <div
               
               ref={searchRef}
               
               className="nav-searches border border-gray-300 shadow-md shadow-gray-200">

                  {
                    searchedItems?.map((item)=>(

                      <Link to={`/place/${item?._id}`} key={item?._id} onClick={()=>(setSearchItem(""))}>
                        <div className="nav-single-search" >
                          <img src={`${photoBaseUrl}`+item?.photos?.[0]} alt={item?.title} />
                          <p className='name'>{item?.title}</p>
                          <p className='location'>{item?.address}</p>
                        </div>
                      </Link>
                      
                    ))
                  }

                  {
                    searchedItems?.length < 1 && (
                      <p className='no-searched-item'>No searched item</p>
                    )
                  }
                
              </div>
            )
          }

         
        </div>
        
        {
          user ? (
            <Link to={'/account'} className='flex items-center  gap-3 border border-gray-300 rounded-full p-0 px-4 shadow-m nav-user-container'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 username-hamburger-btn">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>

              </div>
              {
                user && (
                  <p className='username-account-btn'>{user.userName}</p>
                )
              }

            </Link>

          ):(
            <Link to={'/login'} className='flex items-center  gap-3 border border-gray-300 rounded-full p-0 px-4 shadow-m'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 username-hamburger-btn">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <div className='bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
                </svg>

              </div>
              

            </Link>
          )
        }
        

      </header>
  )
}

export default Navbar
