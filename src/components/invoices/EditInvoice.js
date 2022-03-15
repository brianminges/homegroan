import React, { useState, useEffect } from "react"
import { useNavigate, Link, useParams } from "react-router-dom"
import { editInvoice, getAllInvoices, getAllInvoicesById } from "./../../modules/InvoiceManager"
import { getAllTypes } from "./../../modules/TypeManager"
import { getAllProvidersByType } from "./../../modules/ProviderManager"
import "./CreateInvoice.css"
import "./../HomeGroan.css"

export const EditInvoice = () => {
    const [invoice, setInvoice] = useState({
        // userId: sessionUserId,
        title: "",
        details: "",
        date: "",
        costService: "",
        costParts: "",
        costLabor: "",
        costMisc: "",
        costTax: "",
        costTotal: "",
        typeId: "",
        providerId: "",
        timestamp: new Date().toLocaleString()
    });

    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;
    const [isLoading, setIsLoading] = useState(false);
    const {invoiceId} = useParams();
    const navigate = useNavigate();
   
    const [types, setTypes] = useState([]);
    const [sortedTypes, setSortedTypes] = useState([]);

    const [providers, setProviders] = useState([]);
    const [sortedProviders, setSortedProviders] = useState({});


    //Sets invoices on load
    useEffect(() => {
        getAllInvoicesById(invoiceId)
            .then(invoice => {
                setInvoice(invoice);
                setIsLoading(false);
            })
    }, [invoiceId])

     
    // Sets types dropdown on load
    useEffect(() => {
        getAllTypes(sessionUserId)
            .then(setTypes)
    }, []);

    // Alphabetizes types dropdown
    useEffect(() => {
        if (types.length > 0) {
            const tempTypes = types.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            setSortedTypes(tempTypes)}
    }, [types])


    // Sets providers dropdown on load
    useEffect(() => {
        getAllProvidersByType(sessionUserId)
            .then(setProviders)
    }, []);

    // Alphabetizes providers dropdown 
    useEffect(() => {
        if (providers.length > 0) {
            const tempProviders = providers.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            setSortedProviders(tempProviders)}
    }, [providers])


   //Adds costs and displays dynamically in the Total Cost input field
    const calcCosts = () => {
        const total = (invoice.costService *100) + (invoice.costParts *100 + (invoice.costLabor *100) + (invoice.costMisc *100) + (invoice.costTax *100))
        invoice.costTotal = total/100
            return total /100
    }

    const calculatedTotal = calcCosts()

    const handleFieldChange = (event) => {
        const updatedInvoice = {...invoice}
        let selectedVal = event.target.value
        //Checks for strings that need to be stored as integers
        if (event.target.id.includes("Id") || (event.target.id.includes("cost")) ) {
            selectedVal = parseFloat(selectedVal) }
        updatedInvoice[event.target.id] = selectedVal
        setInvoice(updatedInvoice)
        calcCosts()
    }; 

    // Checks for values in required fields
    const checkNewInvoice = (event) => {
        event.preventDefault()
        if ((invoice.title === "") || 
                (invoice.details === "") || 
                    (invoice.date === "") || 
                        (invoice.costService === "") || 
                            (invoice.costParts === "") ||
                                (invoice.costLabor === "") ||
                                    (invoice.costMisc === "") ||
                                        (invoice.costTax === "") ||
                                            (calculatedTotal === null) ||
                                            // (invoice.costTotal === "") ||
                                                (invoice.typeId === "") ||
                                                    (invoice.providerId === "")) {
                                                             window.alert('All fields must be filled in')
        } else {
            editInvoice(invoice)
                .then(window.alert(`👍'${invoice.title} has been updated'`))
                .then(() => navigate("/Invoices"))
        }
    };

    // const updateInvoice = (event) => {
    //     // event.prevent.Default()
    //     setIsLoading(true);

    //     const editedInvoice = {
    //         userId: sessionUserId,
    //         title: invoice.title,
    //         details: invoice.details,
    //         date: invoice.date,
    //         costService: invoice.costService,
    //         costParts: invoice.costParts,
    //         costLabor: invoice.costLabor,
    //         costMisc: invoice.costMisc,
    //         costTax: invoice.costTax,
    //         costTotal: invoice.costTotal,
    //         typeId: invoice.typeId,
    //         providerId: invoice.providerId,
    //         timestamp: new Date().toLocaleString()
    //     }

    //     editInvoice(editedInvoice)
    //         .then(() => navigate("/Invoices")
    //         )
    // }


    return (
        <>
            <h2 className="page__title"> Editing Invoice</h2>
            <div className="page__grid">
                <div className="page__grid__left">
                    <picture>
                        <img 
                            className="main__image" 
                            src={'./../../images/black.png'} 
                            alt="Computer-generated figure holding a large wrench" />
                    </picture>
                </div>

                <div className="page__grid__center">
                    <form>
                        <h3>Basic information</h3>
 
                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="title" 
                                className="form__input__label">
                                Title
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form" 
                                id="title" 
                                onChange={handleFieldChange} 
                                value={invoice.title}
                                required autoFocus>
                            </input>
                        </fieldset>
 
                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="details"
                                className="form__input__label">
                                Details
                            </label>
                            <textarea 
                                className="input__field__form"
                                id="details"
                                onChange={handleFieldChange} 
                                value={invoice.details}
                                required >  
                            </textarea>
                        </fieldset>
                        
                        <fieldset  className="form__input__fieldset">
                            <label
                                htmlFor="date" 
                                className="form__input__label">
                                Date
                            </label>
                            <input 
                                type="date"
                                id="date"
                                onChange={handleFieldChange}
                                value={invoice.date}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset">
                            <label
                                htmlFor="typeId" 
                                className="form__input__label">
                                Type
                            </label>
                            <select  
                                className="form__select"
                                id="typeId"
                                onChange={handleFieldChange}
                                value={invoice.typeId}
                                name="typeId"
                                required >
                                <option value="0">Please select ...</option>
                                {types.map(
                                    type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                            </select>
                        </fieldset>

                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="provider"
                                className="form__input__label">
                                Provider
                            </label>
                            <select 
                                className="form__select"
                                id="providerId"
                                onChange={handleFieldChange}
                                value={invoice.providerId}
                                name="providerId"
                                required >
                                <option value="0">Please select ... </option>
                                {providers.map(
                                    provider => (
                                        <option key={provider.id} value={provider.id}>{provider.name}</option>
                                    ))} 
                            </select>
                        </fieldset>
                            <div  className="form__textlinks">
                                <div className="form__textlink form__textlink__left"> <Link to="/AddServiceProvider">Add new provider</Link></div>
                                {/* <div className="form__textlink"> Edit service provider</div> */}
                            </div>
                         

                        <fieldset>
                            <button 
                                type="submit"
                                className="invoice__btn"
                                onClick={checkNewInvoice} >
                                Submit invoice
                            </button>
                        </fieldset>

                    </form>
                </div>

                <div className="page__grid__right">
                    <form>
                    <h3>Cost calculator</h3>

                        <fieldset className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costService"
                                className="form__input__label__calc">
                                Service fee
                            </label>
                            <input 
                                type="number" 
                                className="form__input__input__calc" 
                                id="costService"
                                placeholder="$0.00" 
                                onChange={handleFieldChange}
                                value={invoice.costService}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costParts"
                                className="form__input__label__calc">
                                Parts
                            </label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="form__input__input__calc" 
                                id="costParts"
                                placeholder="$0.00" 
                                onChange={handleFieldChange}
                                value={invoice.costParts}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costLabor"
                                className="form__input__label__calc">
                                Labor
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costLabor"
                                placeholder="$0.00"
                                onChange={handleFieldChange}
                                value={invoice.costLabor}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costMisc"
                                className="form__input__label__calc">
                                Misc. 
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costMisc" 
                                placeholder="$0.00"
                                onChange={handleFieldChange}
                                value={invoice.costMisc}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costTax"
                                className="form__input__label__calc">
                                Tax
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costTax" 
                                placeholder="$0.00" 
                                onChange={handleFieldChange}
                                value={invoice.costTax}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costTotal"
                                className="form__input__label__calc">
                                TOTAL 
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costTotal" 
                                placeholder="$0.00" 
                                onChange={handleFieldChange}
                                // onChange={bonusFunction}
                                // value={invoice.costTotal}
                                value={calcCosts()}
                                required >
                            </input>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}