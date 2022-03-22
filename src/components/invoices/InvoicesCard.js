import React, { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import "./InvoicesCard.css"


export const InvoicesCard = ({ invoice, handleDeleteInvoice, handleEditInvoice }) => {
    

    const {providerId} = useParams();
    const navigate = useNavigate();

    // Changes date from yyyy-MM-dd to weekday, month date, year
    const changeDateFormat = (inputDate) => {
        let date = new Date(inputDate);
        
        return date.toLocaleString('en-US', {
            weekday: 'long', // long, short, narrow
            day: 'numeric', // numeric, 2-digit
            year: 'numeric', // numeric, 2-digit
            month: 'long', // numeric, 2-digit, long, short, narrow
            // hour: 'numeric', // numeric, 2-digit
            // minute: 'numeric', // numeric, 2-digit
            // second: 'numeric', // numeric, 2-digit
        });
       
    }

    //Adds commas and cents to decimal places (where applicable) to costs
    const changeCurrencyFormat = (inputCurrency) => {
       return Number(inputCurrency).toLocaleString(undefined, {minimumFractionDigits: 2}).replace(/\.([0-9])$/, ".$10")
    }


    return (
        <>
        <div  className="invoice__card">
            <div className="invoice__card__body">
                <div className="invoice__card__left">
                    <h3 className="invoice__card__title">{invoice.title}</h3>
                    <p><strong>Provider: </strong>{invoice.provider.name} </p>
                    <p><strong>Account No.: </strong>{invoice.invoiceNumber} <strong>Invoice No.: </strong>{invoice.invoiceNumber}</p> 
                     
                    
                    <p><strong>Date of service: </strong> {changeDateFormat(invoice.date)}</p>
                    <p><strong>Details:</strong> {invoice.details}</p>  
                </div>
                <div className="invoice__card__right">
                    <div className="tabs">
                        <div className="test">
                            <p><strong>Service fee</strong> </p>
                        </div>
                        <div>
                            <span>${changeCurrencyFormat(invoice.costService)}</span>
                        </div>
                    </div>
                    <div className="tabs">
                        <div>
                            <p><strong>Parts</strong> </p>
                        </div>
                        <div>
                            <span>${changeCurrencyFormat(invoice.costParts)}</span>
                        </div>
                    </div>
                    <div className="tabs">
                        <div>
                            <p><strong>Labor</strong> </p>
                        </div>
                        <div>
                            <span>${changeCurrencyFormat(invoice.costLabor)}</span>
                        </div>
                    </div>
                    <div className="tabs">
                        <div>
                            <p><strong>Misc.</strong> </p>
                        </div>
                        <div>
                            <span>${changeCurrencyFormat(invoice.costMisc)}</span>
                        </div>
                    </div>
                    <div className="tabs" id="chart__costTax">
                        <div>
                            <p><strong>Tax</strong> </p>
                        </div>
                        <div>
                            <span>${changeCurrencyFormat(invoice.costTax)}</span>
                        </div>
                    </div>

                    <div className="tabs" id="chart__costTotal">
                        <div >
                            <p><strong>TOTAL</strong> </p>
                        </div>
                        <div>
                            <span>${changeCurrencyFormat(invoice.costTotal)}</span>
                        </div>
                    </div>

                </div>
            </div>
            <div className="invoice__buttons">
                <button
                    id="invoice__delete__button"
                    onClick={() => handleDeleteInvoice(invoice.id)}>
                    Delete
                </button>
                <button
                    id="invoice__edit__button"
                    onClick={() => {navigate(`/Invoices/${invoice.id}/Edit`)}} >
                    Edit  
                </button>
            </div>
        </div>
        </>
    )
}