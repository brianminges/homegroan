import React, { useState, useEffect } from "react"
import { getAllInvoices } from "./../../modules/InvoiceManager"
import { InvoicesCard } from "./InvoicesCard"

export const InvoicesList = () => {
    const [invoices, setInvoices] = useState([])

    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id

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

    return (
        <>
        <h2 className="page__title">All invoices</h2>
        <div className="invoice__cards page__grid__center__list">

            {invoices.map(invoice =>
            <InvoicesCard 
            key={invoice.id}
            invoice={invoice} />
            )}
        </div>
        </>
    )
}

 