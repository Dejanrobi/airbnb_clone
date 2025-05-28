import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios'

const UserContext = createContext();

const UserContextProvider =({children})=>{
    const [user, setUser] = useState(false);
    const [loading, setLoading] = useState(true);
    

    const getHeaders=()=>{
         // obtain data from the local storage
         const airbnbToken = localStorage.getItem('https://www.airbnb.com/-token');
         
        //  No token, set the user to false
         if(!airbnbToken){
            return setUser(false)
            // return
         }

        //  create the header 
        const airbnbHeader ={
            headers:{
                Authorization: `Bearer ${airbnbToken}`,
            },
        }
        // console.log(airbnbHeader)
        return airbnbHeader;


    }

    const getMainUser=async()=>{
        setLoading(true)
        
        
        const airbnbHeader =getHeaders();

        // authenticating the user and checking the authorization
        // making a request to the server
        if(airbnbHeader){
            try {
                const {data} = await axios.get('/auth/profile', airbnbHeader);
    
                // console.log(data)
                setUser(data)       
                setLoading(false)    
            } catch (error) {
                console.log("Fetch profile error: ", error)
                console.log("Failed to connect to the Database")
                setUser(false) 
                setLoading(false)         
            }
        }else{
            console.log("No Header")
            setLoading(false)   
        }
  
    }

    

    useEffect(()=>{     
        getMainUser()

    },[])

    // console.log(user)
    // console.log(loading)


    return(
        <UserContext.Provider 
            value={{
                user,
                setUser,
                getMainUser,
                loading,
                setLoading,
                getHeaders

            }}
        
        >            
                {children}           
        </UserContext.Provider>
    )

}


export const  userGlobalContext=()=>{
    return useContext(UserContext)
}

// useEffect(()=>{
//     console.log(userGlobalContext())

// },[])


export { UserContextProvider }




