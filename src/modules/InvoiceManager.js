import React from "react";

const URL = "http://localhost:8088"

// Gets all invoices
export const getAllInvoices = () => {
    return fetch(`${URL}/invoices`)
    .then(res => res.json())
}

// Gets all invoices with providers
export const getInvoicesByProvider = () => {
    return fetch(`${URL}/invoices?_expand=provider`)
    .then(res => res.json())
}

//Posts a new invoice 
export const addInvoice = (newInvoice) => {
    return fetch(`${URL}/invoices`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newInvoice)
    }).then(res => res.json())
}
 