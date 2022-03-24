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

  // Sorts invoices to display in reverse chronological order 
  const [sortedInvoices, setSortedInvoices] = useState([]);

  useEffect(() => {
      if (invoices.length > 0) {
          const tempInvoices = invoices.sort((a,b) => (a.date < b.date) ? 1 : -1)
          setSortedInvoices(tempInvoices)}
  }, [invoices])


  // Executes the delete function on each invoice and re-renders page
  const handleDeleteInvoice = (id) => {
    deleteInvoice(id)
    .then(() => getInvoicesByProviderId(sessionUserId, providerId).then(setInvoices));
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
 
  //Adds commas and cents to decimal places (where applicable) to costs
  const changeCurrencyFormat = (inputCurrency) => {
    return Number(inputCurrency).toLocaleString(undefined, {minimumFractionDigits: 2}).replace(/\.([0-9])$/, ".$10")
  }

  //Lines 77-132 calculate total cost for each invoice category
  const [serviceCost, setServiceCost] = useState([]);
  const [partsCost, setPartsCost] = useState([]);
  const [laborCost, setLaborCost] = useState([]);
  const [miscCost, setMiscCost] = useState([]);
  const [taxCost, setTaxCost] = useState([]);
  const [totalCost, setTotalCost] = useState([]);


  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costService
      setServiceCost(totalCounter.toFixed(2))
    })
  }, [invoices]);

  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costParts
      setPartsCost(totalCounter.toFixed(2))
    })
  }, [invoices]);

  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costLabor
      setLaborCost(totalCounter.toFixed(2))
    })
  }, [invoices]);

  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costMisc
      setMiscCost(totalCounter.toFixed(2))
    })
  }, [invoices]);

  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costTax
      setTaxCost(totalCounter.toFixed(2))
    })
  }, [invoices]);

  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costTotal
      setTotalCost(totalCounter.toFixed(2))
    })
  }, [invoices]);
 

  return (
    <>
    <h2 className="page__title">{provider.name}</h2>
    <p className="detail__timestamp__added">Added on {changeDateFormat(provider.timestamp)}</p>
    <p> You've spent ${changeCurrencyFormat(totalCost)} at {provider.name}</p>
    <p>Service: {serviceCost}</p>
    <p>Parts: {partsCost}</p>
    <p>Labor: {laborCost}</p>
    <p>Misc: {miscCost}</p>
    <p>Tax: {taxCost}</p>

    <div className="detail__page__grid__center">
      <div className="detail__flex">
          <h3 className="detail__subhed">Address</h3> 
            <p>{provider.address}</p>
            <p>{provider.city}, {provider.state} {provider.zip}</p>
            
      </div>
      <div className="detail__flex">
        <h3 className="detail__subhed">Contact</h3> 
          <p>Office: {provider.officePhone}</p> <p>Cell: {provider.officePhone}</p>
          <p><a href={`http://www.${provider.website}`} target="_blank" rel="noopener noreferrer">Website</a></p>
          <p><a href={`mailto:{provider.emailaddress}`}>{provider.emailaddress}</a></p>
      </div>
      <div className="detail__flex">
        <h3 className="detail__subhed">Social Media</h3> 
        <p><a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer">{provider.twitter}</a></p>
        <p><a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer">Facebook.com{provider.facebook}</a></p>
      </div>
        
    </div>
    
    <div className="detail__invoices">

      {sortedInvoices.map(invoice =>
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