import React, { useState, useEffect } from "react"
import { getAllInvoices, deleteInvoice, editInvoice } from "./../../modules/InvoiceManager"
import { InvoicesCard } from "./InvoicesCard"
import "./InvoicesList.css"

export const InvoicesList = () => {
    //Gets current user ID
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id


    const [invoices, setInvoices] = useState([])

    //Fetches invoices on page load and sets to hook above
    const getInvoices = () => {
        return getAllInvoices(sessionUserId).then(dataFromAPI => {
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

    //Executes the delete function and re-renders page
    const handleDeleteInvoice = (id) => {
        deleteInvoice(id)
        .then(() => getAllInvoices(sessionUserId).then(setInvoices));
    };

    return (
        <>
        <h2 className="page__title">All invoices</h2>
        <div className="invoice__cards page__grid__center__list">

            {invoices.map(invoice =>
            <InvoicesCard 
            key={invoice.id}
            invoice={invoice} 
            handleDeleteInvoice={handleDeleteInvoice}/>
            )}
        </div>
        </>
    )
}

 