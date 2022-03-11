import React, { useState, useEffect } from "react"
import { getAllInvoices } from "./../../modules/InvoiceManager"
import { InvoicesCard } from "./InvoicesCard"

export const InvoicesList = () => {
    const [invoices, setInvoices] = useState([])


    const getInvoices = () => {
        return getAllInvoices().then(dataFromAPI => {
            setInvoices(dataFromAPI)
        });
    };

    useEffect(() => {
        getInvoices()
    }, []);

    return (
        <>
        <h2>All invoices</h2>
        {invoices.map(invoice =>
        <InvoicesCard 
        key={invoice.id}
        invoices={invoices} />
        )}
        </>
    )
}

 