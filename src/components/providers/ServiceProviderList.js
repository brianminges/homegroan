import React, { useState, useEffect } from "react"
import { getAllProviders } from "./../../modules/ProviderManager"
import { ServiceProviderCard } from "./ServiceProviderCard";
import { deleteProvider } from "./../../modules/ProviderManager"
import "./ServiceProviderList.css"

export const ServiceProviderList = () => {
    const [providers, setProviders] = useState([]);
    const [sortedProviders, setSortedProviders] = useState([]);

    // Fetches all providers and sets in state
    const getProviders = () => {
        return getAllProviders().then(dataFromAPI => {
            setProviders(dataFromAPI)
        });
    };

    useEffect(() => {
        getProviders()
    }, [])
    
    //Deletes selected user from database
    const handleDeleteProvider = (id) => {
        deleteProvider(id)
        .then(() => getAllProviders().then(setProviders));
    };

    //Sorts list alphabetically
    useEffect(() => {
        if (providers.length > 0) {
            const tempProviders = providers.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            setSortedProviders(tempProviders)}
    }, [providers])

    return (
        <>
        <h2 className="page__title">All Service Providers</h2>
        <div className="provider__cards page__grid__center__list">
            
            {providers.map(provider =>
            <ServiceProviderCard 
            key={provider.id}
            provider={provider}
            handleDeleteProvider={handleDeleteProvider}/>
            )}
        </div>
        </>
    )
}