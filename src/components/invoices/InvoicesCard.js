import React from "react"

export const InvoicesCard = ({ invoice }) => {
     

    return (
        <>
        <h3>{invoice.title}</h3>
        <p>You used <strong>{invoice.provider.name}</strong> on {invoice.date}</p>
        <p><strong>Details:</strong> {invoice.details}</p>
        <p><strong>Cost:</strong> {invoice.costTotal}</p>
        <hr></hr>
        </>
    )
}