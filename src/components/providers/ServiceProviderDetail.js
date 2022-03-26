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
    return getInvoicesByProviderId(providerId).then(dataFromAPI => {
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
    .then(() => getInvoicesByProviderId(providerId).then(setInvoices));
    this.forceUpdate()
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
  // const [serviceCost, setServiceCost] = useState([]);
  // const [partsCost, setPartsCost] = useState([]);
  // const [laborCost, setLaborCost] = useState([]);
  // const [miscCost, setMiscCost] = useState([]);
  // const [taxCost, setTaxCost] = useState([]);
  const [totalCost, setTotalCost] = useState([]);


  // useEffect(() => {
  //   let totalCounter = 0
  //   invoices.forEach(invoice => {
  //     totalCounter += invoice.costService
  //     setServiceCost(totalCounter.toFixed(2))
  //   })
  // }, [invoices]);

  // useEffect(() => {
  //   let totalCounter = 0
  //   invoices.forEach(invoice => {
  //     totalCounter += invoice.costParts
  //     setPartsCost(totalCounter.toFixed(2))
  //   })
  // }, [invoices]);

  // useEffect(() => {
  //   let totalCounter = 0
  //   invoices.forEach(invoice => {
  //     totalCounter += invoice.costLabor
  //     setLaborCost(totalCounter.toFixed(2))
  //   })
  // }, [invoices]);

  // useEffect(() => {
  //   let totalCounter = 0
  //   invoices.forEach(invoice => {
  //     totalCounter += invoice.costMisc
  //     setMiscCost(totalCounter.toFixed(2))
  //   })
  // }, [invoices]);

  // useEffect(() => {
  //   let totalCounter = 0
  //   invoices.forEach(invoice => {
  //     totalCounter += invoice.costTax
  //     setTaxCost(totalCounter.toFixed(2))
  //   })
  // }, [invoices]);

  useEffect(() => {
    let totalCounter = 0
    invoices.forEach(invoice => {
      totalCounter += invoice.costTotal
      setTotalCost(totalCounter.toFixed(2))
    })
  }, [invoices]);
 

  return (
    <>
    <h2 className="page__title"><a href={`http://www.${provider.website}`} target="_blank" rel="noopener noreferrer">{provider.name}</a></h2>
    <p className="detail__timestamp__added">Added on {changeDateFormat(provider.timestamp)}</p>
    <div className="detail__address"> 
    <p>{provider.address}, {provider.city}, {provider.state} {provider.zip}</p>
    <p><strong>Office:</strong> {provider.officePhone} <strong>Cell:</strong> {provider.officePhone} </p>
    <p><strong>Email:</strong> <a href={`mailto:{provider.emailaddress}`}>{provider.emailaddress}</a> <strong>Web: </strong><a href={`http://www.${provider.website}`} target="_blank" rel="noopener noreferrer">{provider.website}</a></p>
    <p><strong>Social: </strong> <a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer">{provider.twitter}</a> | <a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer">Facebook.com{provider.facebook}</a></p>
    <strong>Total spent to date:</strong> ${changeCurrencyFormat(totalCost)}
    </div>


    
    
    <div className="detail__invoices">

      {sortedInvoices.map(invoice =>
      <InvoicesCard 
      key={invoice.id}
      invoice={invoice} 
      handleDeleteInvoice={handleDeleteInvoice}/>
      )}
    </div>

    
    </>
  )
}