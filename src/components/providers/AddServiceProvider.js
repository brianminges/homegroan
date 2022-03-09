import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { getAllStates, addProvider } from "./../../modules/ProviderManager"
import { getAllTypes } from "./../../modules/TypeManager"
import './../invoices/CreateInvoice.css'
import './AddServiceProvider.css'
import "./../HomeGroan.css"

export const AddServiceProvider = () => {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const navigate = useNavigate();
 
    const [states, setStates] = useState([])

    const [types, setTypes] = useState([]);
    const [sortedTypes, setSortedTypes] = useState([]);

    const [provider, setProvider] = useState ({
        userId: sessionUserId,
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        typeId: "",
        timestamp: new Date().toLocaleString()
    })

    // Sets states dropdown on load
    useEffect(() => {
        getAllStates()
            .then(setStates)
    }, []);

    // Sets types dropdown on load
    useEffect(() => {
        getAllTypes()
            .then(setTypes)
    }, []);

    // Alphabetizes types dropdown
    useEffect(() => {
        if (types.length > 0) {
            const tempTypes = types.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            setSortedTypes(tempTypes)}
    }, [types])

    const handleInputChange = (event) => {
        const newProvider = {...provider}
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        newProvider[event.target.id] = selectedVal
        setProvider(newProvider)
    };

    // Checks for values in required fields
    const handleSubmit = (event) => {
        event.preventDefault()
        if ((provider.name === "") || 
                (provider.address === "") || 
                    (provider.city === "") || 
                        (provider.state === "") || 
                            (provider.zip === "") ||
                                (provider.typeId === "")) {
                                    window.alert('All fields must be filled in')
        } else {
            addProvider(provider)
                .then(window.alert('Your provider has been added'))
                .then(() => navigate("/"))
        }
    };

    return (
        <>
            <h2 className="page__title"> Add Service Provider</h2>
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
                                htmlFor="name" 
                                className="form__input__label">
                                Name
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form" 
                                id="name" 
                                onChange={handleInputChange} 
                                value={provider.name}
                                required >
                            </input>
                        </fieldset>

                        <fieldset>
                            <label 
                                htmlFor="address"
                                className="form__input__label">
                                Address
                            </label>
                            <input 
                                type="text"
                                className="input__field__form"
                                id="addres"
                                onChange={handleInputChange} 
                                value={provider.address}
                                required >  
                            </input>
                        </fieldset>

                        <div className="form__inputs">
                            <fieldset>
                                <label
                                    htmlFor="city" 
                                    className="form__input__label">
                                    City
                                </label>
                                <input 
                                    type="text"
                                    className="input__field__form"
                                    id="city"
                                    onChange={handleInputChange}
                                    value={provider.city}
                                    required >
                                </input>
                            </fieldset>

                            <fieldset >
                                <label 
                                    htmlFor="state"
                                    className="form__input__label">
                                    State
                                </label>
                                <select 
                                    className="form__select"
                                    id="state"
                                    onChange={handleInputChange}
                                    value={provider.state}
                                    name="state"
                                    required >
                                    <option value="0">Please select ... </option>
                                    {states.map(
                                        state => (
                                                <option key={state.id} value={state.id}>{state.name}</option>
                                        ))}
                                </select>
                            </fieldset>

                            <fieldset>
                                <label
                                    htmlFor="zip" 
                                    className="form__input__label">
                                    ZIP code
                                </label>
                                <input 
                                    type="text"
                                    className="input__field__form"
                                    id="zip"
                                    onChange={handleInputChange}
                                    value={provider.zip}
                                    required >
                                </input>
                            </fieldset>
                        </div>

                        <fieldset>
                            <label
                                htmlFor="typeId" 
                                className="form__input__label">
                                Type
                            </label>
                            <select  
                                className="form__select"
                                id="typeId"
                                onChange={handleInputChange}
                                value={provider.typeId}
                                name="typeId"
                                required >
                                <option value="0">Please select ...</option>
                                {types.map(
                                    type => (
                                        <option key={type.id} value={type.id}>{type.name}</option>
                                    ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <button 
                                type="submit"
                                className="invoice__btn" 
                                onClick={ handleSubmit} >
                                Add new provider
                            </button>
                        </fieldset>
                    </form>
                </div>

                <div className="page__grid__right">
                    <h3>Other providers</h3>
                </div>
            </div>
        </>
    )
}