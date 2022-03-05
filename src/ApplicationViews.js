import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import { Home } from "./Home"

export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    const setAuthUser = (user) => {
    sessionStorage.setItem("kennel_customer", JSON.stringify(user))
    setIsAuthenticated(sessionStorage.getItem("kennel_customer") !== null)
    }

    return (
        <>
            <Routes>
                {/* Render the location list when http://localhost:3000/ */}
                <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />

                <Route exact path="/register" element={<Register />} />

                <Route exact path="/" element={
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                } />

                



            </Routes>
        </>
    )
}