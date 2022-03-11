import React, { useState, useEffect } from "react"
import { getInvoicesByProvider } from "./../../modules/InvoiceManager"
import { Link } from "react-router-dom"
import "./ServiceProviderCard.css"
import "./../HomeGroan.css"

export const ServiceProviderCard = ({provider, handleDeleteProvider}) => {
    const [invoices, setInvoices] = useState([]);

    const getInvoices = () => {
        return getInvoicesByProvider().then(dataFromAPI => {
            setInvoices(dataFromAPI)
        });
    };

    useEffect(() => {
        getInvoices()
    }, [])

 
    return (
        <>

        <div className="provider__card">
            <div className="test">
                <h3>{provider.name}</h3>
                <p>{provider.address}</p>
                <p>{provider.city}, {provider.state} {provider.zip}</p>
                <p>{provider.phone}</p>
                <p>{provider.email}</p>
                <p>{provider.twitter}</p>
                <p>{provider.facebook}</p>
                <button
                    onClick={() => handleDeleteProvider(provider.id)}>
                    Delete
                </button>
                <Link to={`/ServiceProviders/${provider.id}`}>
                <button>Details</button>
                </Link>
            </div>
        </div>
        </>

    )
}
 