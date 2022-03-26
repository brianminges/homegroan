import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { getAllProviders } from "./../../modules/ProviderManager"
import { ServiceProviderCard } from "./ServiceProviderCard";
import { deleteProvider, editProvider } from "./../../modules/ProviderManager"
import "./ServiceProviderList.css"

export const ServiceProviderList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {providerId} = useParams();

    const [providers, setProviders] = useState([]);
    const [sortedProviders, setSortedProviders] = useState([]);

    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id

    // Fetches all providers and sets in state
    const getProviders = () => {
        return getAllProviders(sessionUserId).then(dataFromAPI => {
            setProviders(dataFromAPI)
        });
    };

    useEffect(() => {
        getProviders()
    }, [])
    
    //Deletes selected user from database
    const handleDeleteProvider = (id) => {
        deleteProvider(id)
        .then(() => getAllProviders(sessionUserId).then(setProviders));
    };

    //Sorts list alphabetically
    useEffect(() => {
        if (providers.length > 0) {
            const tempProviders = providers.sort((a,b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)
            setSortedProviders(tempProviders)}
    }, [providers])




    //Controls favorites
    // const [favorite, setFavorite] = useState({})
    const handleMakeFavorite = id => {
 
        const favoritedProvider = {
          id: id,
          favorite: true
        };
        // setFavorite(favorite)
        editProvider(favoritedProvider)
        .then(() => getAllProviders(sessionUserId).then(setProviders));
    }

    const handleMakeUnfavorite = id => {
        const unfavoritedProvider = {
          id: id,
          favorite: false
        };
        // setFavorite(favorite)
        editProvider(unfavoritedProvider)
        .then(() => getAllProviders(sessionUserId).then(setProviders));
    }




    // useEffect(() => {
    //     console.log(favorite)
    // }, [providers])



    return (
        <>
        <h2 className="page__title">All Service Providers</h2>
        <div className="provider__cards page__grid__center__list">
            
            {sortedProviders.map(provider =>
            <ServiceProviderCard 
            key={provider.id}
            provider={provider}
            handleMakeFavorite={handleMakeFavorite}
            handleMakeUnfavorite={handleMakeUnfavorite}
            handleDeleteProvider={handleDeleteProvider}/>
            )}
        </div>
        </>
    )
}