import React from "react";
import { Route, Routes, Navigate } from "react-router-dom"
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import { Home } from "./Home"
import { CreateInvoice } from "./components/invoices/CreateInvoice"
import { InvoicesList } from "./components/invoices/InvoicesList"
import { InvoicesCard } from "./components/invoices/InvoicesCard"
import { AddServiceProvider } from "./components/providers/AddServiceProvider"
import { ServiceProviderList } from "./components/providers/ServiceProviderList"
import { ServiceProviderDetail } from "./components/providers/ServiceProviderDetail"
import { EditServiceProvider } from "./components/providers/EditServiceProvider"
import { Search } from "./components/search/Search"

export const ApplicationViews = ({ isAuthenticated, setIsAuthenticated }) => {

    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    }

    const setAuthUser = (user) => {
    sessionStorage.setItem("homegroan_user", JSON.stringify(user))
    setIsAuthenticated(sessionStorage.getItem("homegroan_user") !== null)
    }

    return (
        <>
            <Routes>
            <Route exact path="/login" element={<Login setAuthUser={setAuthUser} />} />
            <Route exact path="/register" element={<Register />} />
            
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/" element={
                <PrivateRoute>
                    <Home />
                </PrivateRoute>
            } />

            <Route exact path="/Invoices" element={
                <PrivateRoute>
                    <InvoicesList />
                </PrivateRoute>
            } />
            <Route exact path="/Invoices/:invoicesId" element={
                <PrivateRoute>
                    <InvoicesCard />
                </PrivateRoute>
            } />
            <Route exact path="/CreateInvoice" element={
                <PrivateRoute>
                    <CreateInvoice />
                </PrivateRoute>
            } />

            
            <Route exact path="/ServiceProviders" element={
                <PrivateRoute>
                    <ServiceProviderList />
                </PrivateRoute>
            } />
            <Route exact path="/ServiceProviders/:providerId" element={
                <PrivateRoute>
                    <ServiceProviderDetail />
                </PrivateRoute>
            } />
            <Route exact path="/AddServiceProvider" element={
                <PrivateRoute>
                    <AddServiceProvider />
                </PrivateRoute>
            } />
            <Route exact path="/ServiceProviders/:providerId/Edit" element={
                <PrivateRoute>
                    <EditServiceProvider />
                </PrivateRoute>
            } />

            <Route exact path="/Search" element={
                <PrivateRoute>
                    <Search />
                </PrivateRoute>
            } />

            </Routes>
        </>
    )
}

