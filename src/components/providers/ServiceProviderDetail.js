import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProviderById } from "./../../modules/ProviderManager"
import "./ServiceProviderDetail.css"

export const ServiceProviderDetail = () => {

    const [provider, setProvider] = useState({ id: null, name: "", address: "" });
    // const [isLoading, setIsLoading] = useState(true);
  
    const {providerId} = useParams();
    // const navigate = useNavigate();
  
    useEffect(() => {
      getProviderById(providerId)
        .then(provider => {
          setProvider(provider);
        //   setIsLoading(false);
        });
    }, [providerId]);


    return (
        <>
        <h2 className="page__title">{provider.name}</h2>
        <div className="page__grid__center__detail"> 
            <p>{provider.address}</p>
            <p>{provider.city}, {provider.state} {provider.zip}</p>
            <p>{provider.phone}</p>
            <p>{provider.email}</p>
            <p>{provider.twitter}</p>
            <p>{provider.facebook}</p>
        </div>
        </>
    )
}