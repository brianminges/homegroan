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

 