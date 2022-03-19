import React, { useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import { addInvoice, getAllInvoices } from "./../../modules/InvoiceManager"
import { getAllTypes } from "./../../modules/TypeManager"
import { getAllProvidersByType } from "./../../modules/ProviderManager"
import { AddType } from "./../types/CreateType"
import { EditType } from "./../types/EditType"
import "./CreateInvoice.css"
import "./../HomeGroan.css"

export const CreateInvoice = () => {
    //Gets logged-in user info 
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const navigate = useNavigate();
   
    const [types, setTypes] = useState([]);
    const [sortedTypes, setSortedTypes] = useState([]);

    const [providers, setProviders] = useState([]);
    const [sortedProviders, setSortedProviders] = useState([]);

    const [typeObject, setTypeObject] = useState("");

    const [invoice, setInvoice] = useState({
        userId: sessionUserId,
        title: "",
        details: "",
        date: "",
        invoiceNumber: "",
        accountNumber: "",
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

    //Stores input values then sets them in state then runs cost calculator
    const handleInputChange = (event) => {
        const newInvoice = {...invoice}
        let selectedVal = event.target.value
        //Checks for strings that need to be stored as integers
        if (event.target.id.includes("Id") || (event.target.id.includes("cost")) ) {
            selectedVal = parseFloat(selectedVal) }
        if (event.target.id.includes("type")) {
            const selectedType = types.filter((type) => {
                return type.id === parseInt(selectedVal)
            })
            setTypeObject(selectedType[0])
        }
        newInvoice[event.target.id] = selectedVal
        setInvoice(newInvoice)
        calcCosts()
    };

    // Checks for values in required fields
    const handleSubmit = (event) => {
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
            (invoice.typeId === "") ||
            (invoice.providerId === "")) {
                fieldsDialog.current.showModal()
        } else {
            addInvoice(invoice)
                .then(() => navigate("/invoices"))
        }
    };

     
    // Sets types dropdown on load
    useEffect(() => {
        getAllTypes(sessionUserId)
            .then(setTypes)
    }, []);

    // Alphabetizes types dropdown
    useEffect(() => {
        if (types.length > 0) {
            const tempTypes = types.sort((a,b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)
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
            const tempProviders = providers.sort((a,b) => (a.name?.toLowerCase() > b.name?.toLowerCase()) ? 1 : -1)
            setSortedProviders(tempProviders)}
    }, [providers])


   //Adds costs and displays dynamically in the Total Cost input field
    const calcCosts = () => {
        const total = (invoice.costService *100) + (invoice.costParts *100 + (invoice.costLabor *100) + (invoice.costMisc *100) + (invoice.costTax *100))
        invoice.costTotal = total/100
        const formmatedTotal = total.toFixed(2)
        return formmatedTotal /100
    }
    const calculatedTotal = calcCosts()


    // Checks to make sure a provider is selected before routing to edit form
    const editThisInvoice = () => {
        if (invoice.providerId === "") {
            providerDialog.current.showModal()
        } else {
            navigate(`/ServiceProviders/${invoice.providerId}/Edit`)
        }
    }

    // Checks to make sure a type is selected before routing to edit popup
    const editThisType = () => {
        if (invoice.typeId === "") {
            providerDialog.current.showModal()
        } else {
            setEditTypePopup(true)
        }
    }

    
 

    //Sets state of 'Add new type' popup to false on load
    const [typePopup, setTypePopup] = useState(false)

    //Sets state of 'Edit new type' popup to false on load
    const [editTypePopup, setEditTypePopup] = useState(false)


    const providerDialog = useRef()
    const fieldsDialog = useRef()

   

 
    return (
        <>
            <dialog className="dialog" ref={providerDialog}>
                <div className="dialog__login">Select from the menu before clicking Edit.</div>
                <button className="dialog__btn" onClick={e => providerDialog.current.close()}>Close</button>
            </dialog>

            <dialog className="dialog" ref={fieldsDialog}>
                <div className="dialog__login">Fill in all required fields.</div>
                <button className="dialog__btn" onClick={e => fieldsDialog.current.close()}>Close</button>
            </dialog>

            <h2 className="page__title"> Create New Invoice</h2>
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
                    <div>
                        <form>
                        <h3>Basic information</h3>
                        <p>*required</p>
                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="title" 
                                className="form__input__label">
                                Title*
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form" 
                                id="title" 
                                onChange={handleInputChange} 
                                value={invoice.title}
                                required autoFocus>
                            </input>
                        </fieldset>
 
                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="details"
                                className="form__input__label">
                                Details*
                            </label>
                            <textarea 
                                className="input__field__form"
                                id="details"
                                onChange={handleInputChange} 
                                value={invoice.details}
                                required >  
                            </textarea>
                        </fieldset>
                        
                        <div className="form__inputs">
                            <fieldset  className="form__input__fieldset form__input__triple">
                                <label
                                    htmlFor="date" 
                                    className="form__input__label">
                                    Date*
                                </label>
                                <input 
                                    type="date"
                                    id="date"
                                    onChange={handleInputChange}
                                    value={invoice.date}
                                    required >
                                </input>
                            </fieldset>

                            <fieldset  className="form__input__fieldset form__input__triple">
                                <label
                                    htmlFor="invoiceNumber" 
                                    className="form__input__label">
                                    Invoice number
                                </label>
                                <input 
                                    type="text"
                                    className="input__field__form"
                                    id="invoiceNumber"
                                    onChange={handleInputChange}
                                    value={invoice.invoiceNumber} >
                                </input>
                            </fieldset>

                            <fieldset  className="form__input__fieldset form__input__triple">
                                <label
                                    htmlFor="accountNumber" 
                                    className="form__input__label">
                                    Account number
                                </label>
                                <input 
                                    type="text"
                                    className="input__field__form"
                                    id="accountNumber"
                                    onChange={handleInputChange}
                                    value={invoice.accountNumber} >
                                </input>
                            </fieldset>
                        </div>

                        <div className="form__inputs">
                        <fieldset>
                            <div className="form__input__fieldset">
                                <label
                                    htmlFor="typeId" 
                                    className="form__input__label">
                                    Type*
                                </label>
                                <select  
                                    className="form__select"
                                    id="typeId"
                                    onChange={handleInputChange}
                                    value={invoice.typeId}
                                    name="typeId"
                                    required >
                                    <option value="0">Please select ...</option>
                                    {types.map(
                                        type => (
                                            <option key={type.id} value={type.id}>{type.name}</option>
                                        ))}
                                </select>
                            </div>
                            <div  className="form__textlinks">
                                <div className="form__textlink form__textlink__left__type"> <span onClick={() => setTypePopup(true)}>Add new type</span> </div>
                                <div className="form__textlink form__textlink__right"> <span onClick={() => editThisType()}>Edit</span> </div>

                                <AddType types={types} setTypes={setTypes} typeTrigger={typePopup} setTypeTrigger={setTypePopup} handleInputChange={handleInputChange}/>
                                <EditType invoice={invoice} type={typeObject} setTypes={setTypes} editTypePopup={editTypePopup} setEditTypePopup={setEditTypePopup} />
                            </div>
                        </fieldset>

                        <fieldset >
                            <div className="form__input__fieldset">
                                <label 
                                    htmlFor="providerId"
                                    className="form__input__label wide__label"
                                    id="provider__label">
                                    Provider*
                                </label>
                                <select 
                                    className="form__select"
                                    id="providerId"
                                    onChange={handleInputChange}
                                    value={invoice.providerId}
                                    name="providerId"
                                    required >
                                    <option value="0">Please select ... </option>
                                    {providers.map(
                                        provider => (
                                            <option key={provider.id} value={provider.id}>{provider.name}</option>
                                        ))} 
                                </select>
                            </div>
                            <div  className="form__textlinks">
                                <div className="form__textlink form__textlink__left"> <Link to="/AddServiceProvider">Add new provider</Link></div>
                                <div className="form__textlink form__textlink__right" onClick={() => editThisInvoice()}> Edit </div>
                            </div>
 
                        </fieldset>
                        </div>
                        </form>
                    </div> 
                     
                    <div>
                        <fieldset className="fieldset__button">
                            <button 
                                type="submit"
                                className="invoice__btn"
                                onClick={handleSubmit} >
                                Submit 
                            </button>
                        </fieldset>
                    </div>
                </div>

                <div className="page__grid__right">
                    <form>
                    <h3>Cost calculator</h3>
                    <p> Enter 0 if no cost</p>
                        <fieldset className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costService"
                                className="form__input__label__calc">
                                Service fee*
                            </label>
                            <input 
                                type="number" 
                                className="form__input__input__calc" 
                                id="costService"
                                placeholder="$0.00" 
                                onChange={handleInputChange}
                                value={invoice.costService}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costParts"
                                className="form__input__label__calc">
                                Parts*
                            </label>
                            <input 
                                type="number" 
                                step="0.01"
                                className="form__input__input__calc" 
                                id="costParts"
                                placeholder="$0.00" 
                                onChange={handleInputChange}
                                value={invoice.costParts}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costLabor"
                                className="form__input__label__calc">
                                Labor*
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costLabor"
                                placeholder="$0.00"
                                onChange={handleInputChange}
                                value={invoice.costLabor}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costMisc"
                                className="form__input__label__calc">
                                Misc.* 
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costMisc" 
                                placeholder="$0.00"
                                onChange={handleInputChange}
                                value={invoice.costMisc}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costTax"
                                className="form__input__label__calc">
                                Tax*
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costTax" 
                                placeholder="$0.00" 
                                onChange={handleInputChange}
                                value={invoice.costTax}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset__calc">
                            <label 
                                htmlFor="costTotal"
                                className="form__input__label__calc">
                                TOTAL* 
                            </label>
                            <input 
                                type="number"
                                step="0.01" 
                                className="form__input__input__calc" 
                                id="costTotal" 
                                placeholder="$0.00" 
                                onChange={handleInputChange}
                                value={calcCosts()}
                                required readOnly>
                            </input>
                        </fieldset>
                    </form>
                </div>
            </div>

        </>
    )
}