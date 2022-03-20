import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProviderById, deleteProvider, getAllProviders } from "./../../modules/ProviderManager"
import { getAllInvoices } from "./../../modules/InvoiceManager"
import "./ServiceProviderDetail.css"

export const ServiceProviderDetail = () => {
  //Gets logged-in user info
  const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
  const sessionUserId = sessionUser.id
  const navigate = useNavigate();


  const [invoices, setInvoices] = useState([])

  //Fetches invoices on page load and sets to hook 
  const getInvoices = () => {
    return getAllInvoices(sessionUserId).then(dataFromAPI => {
        setInvoices(dataFromAPI)
    });
  };

  useEffect(() => {
      getInvoices()
  }, []);

  


  
  

  //Fetches providers on page load and sets to hook 
  const [provider, setProvider] = useState({ id: null, name: "", address: "" });
  const {providerId} = useParams();

  useEffect(() => {
    getProviderById(providerId)
      .then(provider => {
        setProvider(provider);
      });
  }, [providerId]);






  const changeDateFormat = (inputDate) => {
    let date = new Date(inputDate);
    
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



 

  //Gets current year
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()


  const getInvoiceYear = (inputDate) => {
    let date = new Date(inputDate);
    
    return date.toLocaleString('en-US', {
      year: 'numeric', // numeric, 2-digit
    });
  }

  useEffect(() => {
    const invoiceYear = getInvoiceYear(invoices.date)
    console.log(invoiceYear)
  }, [invoices])
  

  const arrayOfParts = []
  // useEffect(() => {
  //     invoices.forEach(invoice => {
  //       if (currentYear == invoiceYear) {
  //         arrayOfParts.push(invoice)
  //         console.log(arrayOfParts)
  //       }
        
  // })}, [invoices]);

  // useEffect(() => {
  //   let sum = 0
  //   for (let i = 0; i < arrayOfParts.length; i++) {
  //     sum += arrayOfParts[i]}
  //     console.log('sum', sum)
  // }, [arrayOfParts])

  useEffect(() => {
    calcTotalOfArray()
    // console.log('sum in useEffect', sum)
  }, [arrayOfParts])


  let sum = 0
  const calcTotalOfArray = () => {
    for (let i = 0; i < arrayOfParts.length; i++) {
      sum += arrayOfParts[i]}
    // console.log('sum in calcTotalOfArray', sum)
  }




  const getYear = (inputDate) => {
    let date = new Date(inputDate);
    
    return date.toLocaleString('en-US', {
        hour: 'numeric', // numeric, 2-digit
    });
  }

  let year = ""
  useEffect(() => {
    year = getYear(invoices.timestamp) 
    // console.log(year)
  }, [invoices])
 



  return (
    <>
    <h2 className="page__title">{provider.name}</h2>
    <p className="detail__timestamp__added">Added on {changeDateFormat(provider.timestamp)}</p>
    <p className="detail__timestamp__updated">Last updated on {changeDateFormat(provider.updatedTimestamp)}</p>
    

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