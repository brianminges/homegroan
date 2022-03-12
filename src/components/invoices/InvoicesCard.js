import React from "react"
import "./InvoicesCard.css"

export const InvoicesCard = ({ invoice }) => {
     
    // Changes date from yyyy-MM-dd to weekday, month date, year
    const changeDateFormat = (inputDate) => {
        var date = new Date(inputDate);
        
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



        


    return (
        <>
        <div className="invoice__card">
            <h3>{invoice.title}</h3>
            <p>You used <strong>{invoice.provider.name}</strong> on {changeDateFormat(invoice.date)}</p>
            <p><strong>Details:</strong> {invoice.details}</p>
            <p><strong>Cost:</strong> ${invoice.costTotal}</p>
            <hr></hr>
        </div>
        </>

    )
}