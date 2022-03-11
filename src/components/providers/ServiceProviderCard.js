import React, { useState, useEffect } from "react"
import { getInvoicesByProvider } from "./../../modules/InvoiceManager"
import { Link } from "react-router-dom"

export const ServiceProviderCard = ({provider}) => {
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
        <h3>{provider.name}</h3>
        <p>{provider.address}</p>
        <p>{provider.city}, {provider.state} {provider.zip}</p>
        <p>{provider.phone}</p>
        <p>{provider.email}</p>
        <p>{provider.twitter}</p>
        <p>{provider.facebook}</p>
        <p>{invoices.provider}</p>
        <hr></hr>
        </>
    )
}
 

// if invoice.providerId === provider.id 
//     return invoice

