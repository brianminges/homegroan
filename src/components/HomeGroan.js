import React, { useState } from "react"
import { ApplicationViews } from '../ApplicationViews'
import './HomeGroan.css'

export const HomeGroan = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("homegrown_user") !== null)
    
    const setAuthUser = (user) => {
        sessionStorage.setItem("homegrown_user", JSON.stringify(user))
        setIsAuthenticated(sessionStorage.getItem("homegrown_user") !== null)
    }

    const clearUser = () => {
        sessionStorage.clear();
        setIsAuthenticated(sessionStorage.getItem("homegrown_user") !== null)
      }

    return (
        <>
            {/* <NavBar clearUser={clearUser} isAuthenticated={isAuthenticated}/> */}
            <ApplicationViews 
                setAuthUser={setAuthUser}
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
      />
            
        </>
    )
}