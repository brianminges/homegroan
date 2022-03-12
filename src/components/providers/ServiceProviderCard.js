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
            {/* <div className="provider__card__textbox"> */}
                <div>
                    <h3>{provider.name}</h3>
                    <p>{provider.address}</p>
                    <p>{provider.city}, {provider.state} {provider.zip}</p>
                    <p>{provider.phone}</p>
                    <p><a href={`mailto:${provider.emailaddress}`}>{provider.emailaddress}</a></p>
                    <p><a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer">{provider.twitter}</a></p>
                    <p><a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer">FB profile</a></p>
                </div>
                <div className="provider__buttons">
                    <div>
                        <button
                            id="provider__delete__button"
                            onClick={() => handleDeleteProvider(provider.id)}>
                            Delete
                        </button>
                    </div>
                    <div>
                        <Link to={`/ServiceProviders/${provider.id}`}>
                            <button id="provider__details__button">Details</button>
                        </Link>
                    </div>
                    
                </div>
            </div>
        {/* </div> */}
        </>

    )
}
 