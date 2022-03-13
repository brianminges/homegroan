import React from "react";

const URL = "http://localhost:8088"

// Gets all invoices
export const getAllInvoices = (sessionUserId) => { 
    return fetch(`${URL}/invoices/?userId=${sessionUserId}&_expand=provider`)
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

// Deletes invoice from database
export const deleteInvoice = (id) => {
    return fetch(`${URL}/invoices/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}