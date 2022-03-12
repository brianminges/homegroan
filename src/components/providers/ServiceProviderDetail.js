import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProviderById } from "./../../modules/ProviderManager"
import "./ServiceProviderDetail.css"

export const ServiceProviderDetail = () => {

    const [provider, setProvider] = useState({ id: null, name: "", address: "" });
  
    const {providerId} = useParams();
  
    useEffect(() => {
      getProviderById(providerId)
        .then(provider => {
          setProvider(provider);
        });
    }, [providerId]);


    return (
        <>
        <h2 className="page__title">{provider.name}</h2>
        <p className="detail__timestamp">Last modified: {provider.timestamp}</p>
        <div className="detail__page__grid__center">
            <h3 className="detail__subhed">Address</h3> 
            <p>{provider.address}</p>
            <p>{provider.city}, {provider.state} {provider.zip}</p>
            <h3 className="detail__subhed">Contact</h3> 
            <p>{provider.phone}</p>
            <p><a href={`mailto:{provider.emailaddress}`}>{provider.emailaddress}</a></p>
            <h3 className="detail__subhed">Social Media</h3> 
            <p><a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer">{provider.twitter}</a></p>
            <p><a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer">Facebook.com{provider.facebook}</a></p>
        </div>
        </>
    )
}