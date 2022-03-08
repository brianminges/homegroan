import React from "react";

const URL = "http://localhost:8088"

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
 