import React from "react"
import "./InvoicesCard.css"

export const InvoicesCard = ({ invoice, handleDeleteInvoice }) => {
     
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
        // <>
        // <div className="invoice__card">
        //     <div className="invoice__card__left">
        //         <h3>{invoice.title}</h3>
        //         <p>You used <strong>{invoice.provider.name}</strong> on {changeDateFormat(invoice.date)}</p>
        //         <p><strong>Details:</strong> {invoice.details}</p>
        //         <p><strong>Cost:</strong> ${invoice.costTotal}</p>               
        //     </div>
        //     <div className="invoice__card__center">
        //     <h4></h4>
        //         <p><strong>Service fee:</strong> ${invoice.costTotal}</p> 
        //         <p><strong>Parts:</strong> ${invoice.costTotal}</p>
        //         <p><strong>Misc.:</strong> ${invoice.costTotal}</p>
        //         <p><strong>Tax:</strong> ${invoice.costTotal}</p>
        //         <p><strong>TOTAL:</strong> ${invoice.costTotal}</p>
        //     </div>
        //     <div className="invoice__buttons invoice__card__right">

        //         <button
        //             id="invoice__delete__button"
        //             onClick={() => handleDeleteInvoice(invoice.id)}>
        //             Delete
        //         </button>
        //         <button
        //             id="invoice__details__button"
        //             onClick={() => handleDeleteInvoice(invoice.id)}>
        //             Details
        //         </button>
        //         <button
        //             id="invoice__edit__button"
        //             onClick={() => handleDeleteInvoice(invoice.id)}>
        //             Edit
        //         </button>
        //     </div>
        // </div>
        // </>


<>

<div  className="invoice__card">
    <div className="invoice__card__body">
        <div className="invoice__card__left">
            <h3>{invoice.title}</h3>
            <p>You used <strong>{invoice.provider.name}</strong> on {changeDateFormat(invoice.date)}</p>
            <p><strong>Details:</strong> {invoice.details}</p>
            <p><strong>Cost:</strong> ${invoice.costTotal}</p>               
        </div>
        <div className="invoice__card__right">
            <div className="tabs">
                <div>
                    <p><strong>Service fee</strong> </p>
                </div>
                <div>
                    <span className="tab">${invoice.costService}</span>
                </div>
            </div>
            <div className="tabs">
                <div>
                    <p><strong>Parts</strong> </p>
                </div>
                <div>
                    <span className="tab">${invoice.costParts}</span>
                </div>
            </div>
            <div className="tabs">
                <div>
                    <p><strong>Labor</strong> </p>
                </div>
                <div>
                    <span className="tab">${invoice.costLabor}</span>
                </div>
            </div>
            <div className="tabs">
                <div>
                    <p><strong>Misc.</strong> </p>
                </div>
                <div>
                    <span className="tab">${invoice.costMisc}</span>
                </div>
            </div>
            <div className="tabs">
                <div>
                    <p><strong>Tax</strong> </p>
                </div>
                <div>
                    <span className="tab">${invoice.costTax}</span>
                </div>
            </div>

            <div className="tabs" id="costTotal">
                <div >
                    <p><strong>TOTAL</strong> </p>
                </div>
                <div>
                    <span className="tab">${invoice.costTotal}</span>
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
            id="invoice__details__button"
            onClick={() => handleDeleteInvoice(invoice.id)}>
            Details
        </button>
        <button
            id="invoice__edit__button"
            onClick={() => handleDeleteInvoice(invoice.id)}>
            Edit
        </button>
    </div>
</div>
{/* 

        <div className="invoice__buttons">

            <button
                id="invoice__delete__button"
                onClick={() => handleDeleteInvoice(invoice.id)}>
                Delete
            </button>
            <button
                id="invoice__details__button"
                onClick={() => handleDeleteInvoice(invoice.id)}>
                Details
            </button>
            <button
                id="invoice__edit__button"
                onClick={() => handleDeleteInvoice(invoice.id)}>
                Edit
            </button>
        </div> */}
</>

    )
}