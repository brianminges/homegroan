import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProviderById, deleteProvider, getAllProviders } from "./../../modules/ProviderManager"
import { getInvoicesByProviderId, deleteInvoice, getAllInvoices } from "./../../modules/InvoiceManager"
import { InvoicesCard } from "./../invoices/InvoicesCard"
import "./ServiceProviderDetail.css"
import "./../invoices/InvoicesList.css"
import "./../invoices/InvoicesCard.css"


export const ServiceProviderDetail = () => {
  //Gets logged-in user info
  const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
  const sessionUserId = sessionUser.id
  const navigate = useNavigate();

  //Fetches providers on page load and sets to hook 
  const [provider, setProvider] = useState({ id: null, name: "", address: "" });
  const {providerId} = useParams();

  useEffect(() => {
    getProviderById(providerId)
      .then(provider => {
        setProvider(provider);
      });
  }, [providerId]);






  //Fetches invoices by Provider ID on page load and sets to hook 
  const [invoices, setInvoices] = useState([])

  const getInvoices = () => {
    return getInvoicesByProviderId(sessionUserId, providerId).then(dataFromAPI => {
        setInvoices(dataFromAPI)
    });
  };

  useEffect(() => {
      getInvoices() 
  }, []);

  useEffect(() => {
    console.log(invoices)
    console.log(providerId)
  }, [invoices]);




  //Executes the delete function and re-renders page
  const handleDeleteInvoice = (id) => {
    deleteInvoice(id)
    .then(() => getInvoicesByProviderId(providerId).then(setInvoices));
  };







  const changeDateFormat = (inputDate) => {
    let date = new Date(inputDate);
    
    return date.toLocaleString('en-US', {
        weekday: 'long', 
        day: 'numeric',  
        year: 'numeric',  
        month: 'long',  
        hour: 'numeric',  
        minute: 'numeric',  
    });
  }


 

  return (
    <>
    <h2 className="page__title">{provider.name}</h2>
    <p className="detail__timestamp__added">Added on {changeDateFormat(provider.timestamp)}</p>
   

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
    <div className="detailtest">
      {invoices.map(invoice =>
      <InvoicesCard 
      key={invoice.id}
      invoice={invoice}
      handleDeleteInvoice={handleDeleteInvoice}/>
      )}
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