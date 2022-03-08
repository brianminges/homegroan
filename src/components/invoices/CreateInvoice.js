import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { addInvoice } from "./../../modules/InvoiceManager"
import { getAllTypes } from "./../../modules/TypeManager"
import "./CreateInvoice.css"
import "./../HomeGroan.css"

export const CreateInvoice = () => {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const navigate = useNavigate();
    const [types, setTypes] = useState([]);

    const [invoice, setInvoice] = useState({
        userId: sessionUserId,
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
        // providerId: "",
        timestamp: new Date().toLocaleString()
    });
 
    const handleInputChange = (event) => {
        const newInvoice = {...invoice}
        let selectedVal = event.target.value
        newInvoice[event.target.id] = selectedVal
        setInvoice(newInvoice)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if ((invoice.title === "") || 
                (invoice.details === "") || 
                    (invoice.date === "") || 
                        (invoice.costService === "") || 
                            (invoice.costParts === "") ||
                                (invoice.costLabor === "") ||
                                    (invoice.costMisc === "") ||
                                        (invoice.Tax === "") ||
                                            (invoice.Total === "") 
                                                (invoice.typeId === "")) {
                                                //     (invoice.providerId === "")) {
                                                             window.alert('All fields must be filled in')
                                                    }
        else {
            addInvoice(invoice)
                .then(() => navigate("/"))
        }
    };

     
    
    useEffect(() => {
        getAllTypes()
            .then(setTypes)
                // .then(types.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1) )
                //     .then(setTypes)
    }, []);

    // useEffect(() => {
    //     types.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //         .then(setTypes)
    // }, [])


    return (
        <>
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
                    <form>
                        <h3>Basic information</h3>

                        <fieldset>
                            <label 
                                htmlFor="title" 
                                className="form__input__label">
                                Title
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form" 
                                id="title" 
                                onChange={handleInputChange} 
                                value={invoice.title}
                                required >
                            </input>
                        </fieldset>

                        <fieldset>
                            <label 
                                htmlFor="details"
                                className="form__input__label">
                                Details
                            </label>
                            <textarea 
                                className="input__field__form"
                                id="details"
                                onChange={handleInputChange} 
                                value={invoice.details}
                                required >  
                            </textarea>
                        </fieldset>
                        
                        <fieldset>
                            <label
                                htmlFor="date" 
                                className="form__input__label">
                                Date
                            </label>
                            <input 
                                type="date"
                                id="date"
                                onChange={handleInputChange}
                                value={invoice.date}
                                required >
                            </input>
                        </fieldset>

                        <fieldset>
                            <label
                                htmlFor="type" 
                                className="form__input__label">
                                Type
                            </label>
                            <select  
                                className="form__select"
                                id="type"
                                onChange={handleInputChange}
                                value={invoice.typeId}
                                required>
                                <option value="0">Please select ...</option>
                                {types.map(
                                    type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                            </select>
                        </fieldset>

                        {/* <fieldset >
                            <label 
                                htmlFor="provider"
                                className="form__input__label">
                                Provider
                            </label>
                            <select 
                                className="form__select"
                                id="provider"
                                onChange={handleInputChange}
                                value={invoice.providerId}
                                required>
                                <option>Please select ... </option>
                            </select>
                            <div  className="form__textlinks">
                                <div className="form__textlink"> Add service provider</div>
                                <div className="form__textlink"> Edit service provider</div>
                            </div>
                        </fieldset>  */}

                        <fieldset>
                            <button 
                                type="submit"
                                className="invoice__btn"
                                onClick={handleSubmit} >
                                Submit invoice
                            </button>
                        </fieldset>

                    </form>
                </div>
                <div className="page__grid__right">
                    <h3>Cost calculator</h3>

                    <fieldset>
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
                            onChange={handleInputChange}
                            value={invoice.costService}
                            required >
                        </input>
                    </fieldset>

                    <fieldset>
                        <label 
                            htmlFor="costParts"
                            className="form__input__label__calc">
                            Cost (parts)
                        </label>
                        <input 
                            type="number" 
                            className="form__input__input__calc" 
                            id="costParts"
                            placeholder="$0.00" 
                            onChange={handleInputChange}
                            value={invoice.costParts}
                            required >
                        </input>
                    </fieldset>

                    <fieldset>
                        <label 
                            htmlFor="costLabor"
                            className="form__input__label__calc">
                            Cost (labor)
                        </label>
                        <input 
                            type="number" 
                            className="form__input__input__calc" 
                            id="costLabor"
                            placeholder="$0.00"
                            onChange={handleInputChange}
                            value={invoice.costLabor}
                            required >
                        </input>
                    </fieldset>

                    <fieldset>
                        <label 
                            htmlFor="costMisc"
                            className="form__input__label__calc">
                            Cost (misc.)
                        </label>
                        <input 
                            type="number" 
                            className="form__input__input__calc" 
                            id="costMisc" 
                            placeholder="$0.00"
                            onChange={handleInputChange}
                            value={invoice.costMisc}
                            required >
                        </input>
                    </fieldset>

                    <fieldset>
                        <label 
                            htmlFor="costTax"
                            className="form__input__label__calc">
                            Cost (tax)
                        </label>
                        <input 
                            type="number" 
                            className="form__input__input__calc" 
                            id="costTax" 
                            placeholder="$0.00" 
                            onChange={handleInputChange}
                            value={invoice.costTax}
                            required >
                        </input>
                    </fieldset>

                    <fieldset>
                        <label 
                            htmlFor="costTotal"
                            className="form__input__label__calc">
                            TOTAL COST
                        </label>
                        <input 
                            type="number" 
                            className="form__input__input__calc" 
                            id="costTotal" 
                            placeholder="$0.00" 
                            onChange={handleInputChange}
                            value={invoice.costTotal}
                            required >
                        </input>
                    </fieldset>
                </div>
            </div>
        </>
    )
}