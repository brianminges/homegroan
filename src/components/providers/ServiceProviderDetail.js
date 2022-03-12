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
        //   console.log(provider.type.name)
        //   setIsLoading(false);
        });
    }, [providerId]);


    return (
        <>
        <h2 className="page__title">{provider.name}</h2>
        <p className="page__timestamp">Added on {provider.timestamp}</p>
        <div className="page__grid__center__detail">
            <h3 className="details__subhed">Address</h3> 
            <p>{provider.address}</p>
            <p>{provider.city}, {provider.state} {provider.zip}</p>
            <h3 className="detail__subhed">Contact</h3> 
            <p>{provider.phone}</p>
            <p><a href={`mailto:{provider.emailaddress}`}>{provider.emailaddress}</a></p>
            <h3 className="details__subhed">Social Media</h3> 
            <p><a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer">{provider.twitter}</a></p>
            <p><a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer">Facebook.com{provider.facebook}</a></p>
        </div>
        </>
    )
}