import React, { useState, useEffect } from "react"
import { getAllProviders } from "./../../modules/ProviderManager"
import { getInvoicesByProvider } from "./../../modules/InvoiceManager"
import { ServiceProviderCard } from "./ServiceProviderCard";

export const ServiceProviderList = () => {
    const [providers, setProviders] = useState([]);

    const getProviders = () => {
        return getAllProviders().then(dataFromAPI => {
            setProviders(dataFromAPI)
        });
    };

    useEffect(() => {
        getProviders()
    }, [])


    return (
        <>
            <h2>All Service Providers</h2>
            {providers.map(provider =>
            <ServiceProviderCard 
            key={provider.id}
            provider={provider}/>
            )}
            
        </>
    )
}