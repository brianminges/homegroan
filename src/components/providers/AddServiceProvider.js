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
        phone: "",
        emailaddress: "",
        twitter: "",
        facebook: "",
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
        if ((provider.name === "") || (provider.typeId === "")) {
            window.alert('Name and Type are required fields')
        } else {
            addProvider(provider)
                .then(window.alert('Your provider has been added'))
                .then(() => navigate(-1))
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
                            src={'./../../images/orange.png'} 
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
                                id="address"
                                onChange={handleInputChange} 
                                value={provider.address} >  
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

                        <div className="subhed__hr"></div>

                        <h3>Contact information</h3>
                        <div className="form__inputs">
                            <fieldset>
                                <div className="label__input__align">
                                    <div>
                                        <label 
                                            htmlFor="phone" 
                                            className="form__input__label">
                                            Phone
                                        </label>
                                    </div>
                                    <div>
                                        <input 
                                            type="text" 
                                            className="input__field__form" 
                                            id="phone" 
                                            onChange={handleInputChange} 
                                            value={provider.phone} 
                                            placeholder="555-555-5555">
                                        </input>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div className="label__input__align">
                                    <div>
                                        <label 
                                            htmlFor="emailaddress" 
                                            className="form__input__label">
                                            Email
                                        </label>
                                    </div>
                                    <div>
                                        <input 
                                            type="email" 
                                            className="input__field__form" 
                                            id="emailaddress" 
                                            onChange={handleInputChange} 
                                            value={provider.email} 
                                            placeholder="example@email.com">
                                        </input>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="form__inputs">
                            <fieldset>
                                <div className="label__input__align">
                                    <div>
                                        <label 
                                            htmlFor="twitter" 
                                            className="form__input__label">
                                            Twitter
                                        </label>
                                    </div>
                                    <div>
                                        <input 
                                            type="text" 
                                            className="input__field__form" 
                                            id="twitter" 
                                            onChange={handleInputChange} 
                                            value={provider.twitter} 
                                            placeholder="@handle">
                                        </input>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div className="label__input__align">
                                    <div>
                                        <label 
                                            htmlFor="facebook" 
                                            className="form__input__label">
                                            Facebook
                                        </label>
                                        </div>
                                        <div>
                                        <input 
                                            type="url" 
                                            className="input__field__form" 
                                            id="facebook" 
                                            onChange={handleInputChange} 
                                            value={provider.facebook} >
                                        </input>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

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