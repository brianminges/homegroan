import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProviderById, deleteProvider, getAllProviders } from "./../../modules/ProviderManager"
import "./ServiceProviderDetail.css"

export const ServiceProviderDetail = () => {
  
  const navigate = useNavigate();

  const [provider, setProvider] = useState({ id: null, name: "", address: "" });

  const {providerId} = useParams();

  useEffect(() => {
    getProviderById(providerId)
      .then(provider => {
        setProvider(provider);
      });
  }, [providerId]);


  const changeDateFormat = (inputDate) => {
    var date = new Date(inputDate);
    
    return date.toLocaleString('en-US', {
        weekday: 'long', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        // second: 'numeric', // numeric, 2-digit
    });
     
  }

  //Deletes selected user from database
  // const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
  // const sessionUserId = sessionUser.id

  // const [providers, setProviders] = useState([]);

  // const handleDeleteProvider = (id) => {
  //   deleteProvider(id)
  //   .then(() => getAllProviders(sessionUserId).then(setProviders))
  //   .then(navigate(-1));
  // };

  return (
    <>
    <h2 className="page__title">{provider.name}</h2>
    <p className="detail__timestamp">Last modified on {changeDateFormat(provider.timestamp)}</p>
    <div className="detail__page__grid__center">
        <h3 className="detail__subhed">Address</h3> 
        <p>{provider.address}</p>
        <p>{provider.city}, {provider.state} {provider.zip}</p>
        <h3 className="detail__subhed">Contact</h3> 
        <p>Office: {provider.officePhone}</p> <p>Cell: {provider.officePhone}</p>
        <p><a href={`http://www.${provider.website}`} target="_blank" rel="noopener noreferrer">Website</a></p>
        <p><a href={`mailto:{provider.emailaddress}`}>{provider.emailaddress}</a></p>
        <h3 className="detail__subhed">Social Media</h3> 
        <p><a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer">{provider.twitter}</a></p>
        <p><a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer">Facebook.com{provider.facebook}</a></p>
    </div>
    {/* <div className="provider__buttons">
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
        <div>
            <button
                id="provider__edit__button"
                onClick={() => {navigate(`/ServiceProviders/${provider.id}/Edit`)}} >
                Edit
            </button>
        </div>
    </div> */}
    </>
  )
}