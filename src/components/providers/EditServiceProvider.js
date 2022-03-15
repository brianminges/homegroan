import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllStates, editProvider, getProviderById } from "./../../modules/ProviderManager"
import { getAllTypes } from "./../../modules/TypeManager"
import './../invoices/CreateInvoice.css'
import './AddServiceProvider.css'
import "./../HomeGroan.css"

export const EditServiceProvider = () => {
    const [provider, setProvider] = useState ({
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
    })

    const [isLoading, setIsLoading] = useState(false);
    const {providerId} = useParams();
    const navigate = useNavigate();

    const [states, setStates] = useState([])
    
    const [types, setTypes] = useState([]);

    const [sortedTypes, setSortedTypes] = useState([]);  

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

    useEffect(() => {
        getProviderById(providerId)
            .then(provider => {
                setProvider(provider);
                setIsLoading(false);
            })
    }, [providerId]);


    const handleFieldChange = (event) => {
        const updatedProvider = {...provider}
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        updatedProvider[event.target.id] = selectedVal
        setProvider(updatedProvider)
    };





    // Checks for values in required fields
    const checkNewProvider = (event) => {
        event.preventDefault()
        if ((provider.name === "") || (provider.typeId === "")) {
            window.alert('Name and Type are required fields')
        } else {
            editProvider(provider)
                .then(window.alert(`👍'${provider.name} has been updated'`))
                .then(() => navigate(-1))
        }
    };

    // const updateProvider = (event) => {
    //     event.preventDefault()
    //     setIsLoading(true);

    //     const editedProvider = {

    //         id: providerId,
    //         name: provider.name,
    //         address: provider.address,
    //         city: provider.city,
    //         state: provider.state,
    //         zip: provider.zip,
    //         typeId: provider.typeId,
    //         phone: provider.phone,
    //         emailaddress: provider.emailaddress,
    //         twitter: provider.twitter,
    //         facebook: provider.facebook,
    //         timestamp: new Date().toLocaleString()
    //     };

    //     editProvider(editedProvider)
    //         .then(() => navigate("/ServiceProviders")
    //         )
    // }

    return (
        <>
            <h2 className="page__title"> Editing provider</h2>
            <div className="page__grid">
                <div className="page__grid__left">
                    <picture>
                        <img 
                            className="main__image" 
                            src={'./../../images/orangewide.png'} 
                            alt="Computer-generated figure holding a large wrench" />
                    </picture>
                </div>

                <div className="page__grid__center">
                    <form>
                        <h3>Basic information</h3>

                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="name" 
                                className="form__input__label">
                                Name
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form" 
                                id="name" 
                                onChange={handleFieldChange} 
                                value={provider.name}
                                required >
                            </input>
                        </fieldset>

                        <fieldset  className="form__input__fieldset">
                            <label 
                                htmlFor="address"
                                className="form__input__label">
                                Address
                            </label>
                            <input 
                                type="text"
                                className="input__field__form"
                                id="address"
                                onChange={handleFieldChange} 
                                value={provider.address} >  
                            </input>
                        </fieldset>

                        <div className="form__inputs">
                            <fieldset  className="form__input__fieldset">
                                <label
                                    htmlFor="city" 
                                    className="form__input__label">
                                    City
                                </label>
                                <input 
                                    type="text"
                                    className="input__field__form"
                                    id="city"
                                    onChange={handleFieldChange}
                                    value={provider.city}
                                    required >
                                </input>
                            </fieldset>

                            <fieldset className="form__input__fieldset">
                                <label 
                                    htmlFor="state"
                                    className="form__input__label">
                                    State
                                </label>
                                <select 
                                    className="form__select"
                                    id="state"
                                    onChange={handleFieldChange}
                                    value={provider.state}
                                    name="state"
                                    required >
                                    <option value="0">Please select ... </option>
                                    {states.map(
                                        state => (
                                                <option key={state.id} value={state.abbreviation}>{state.abbreviation}</option>
                                        ))}
                                </select>
                            </fieldset>

                            <fieldset className="form__input__fieldset">
                                <label
                                    htmlFor="zip" 
                                    className="form__input__label">
                                    ZIP code
                                </label>
                                <input 
                                    type="text"
                                    className="input__field__form"
                                    id="zip"
                                    onChange={handleFieldChange}
                                    value={provider.zip}
                                    required >
                                </input>
                            </fieldset>
                        </div>

                        <fieldset className="form__input__fieldset">
                            <label
                                htmlFor="typeId" 
                                className="form__input__label">
                                Type
                            </label>
                            <select  
                                className="form__select"
                                id="typeId"
                                onChange={handleFieldChange}
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
                                <div className="label__input__align form__input__fieldset">
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
                                            onChange={handleFieldChange} 
                                            value={provider.phone} 
                                            placeholder="555-555-5555">
                                        </input>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <div className="label__input__align form__input__fieldset">
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
                                            onChange={handleFieldChange} 
                                            value={provider.email} 
                                            placeholder="example@email.com">
                                        </input>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                        <div className="form__inputs">
                            <fieldset>
                                <div className="label__input__align form__input__fieldset">
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
                                            onChange={handleFieldChange} 
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
                                            className="form__input__label form__input__fieldset">
                                            Facebook
                                        </label>
                                        </div>
                                        <div>
                                        <input 
                                            type="url" 
                                            className="input__field__form" 
                                            id="facebook" 
                                            onChange={handleFieldChange} 
                                            value={provider.facebook} 
                                            placeholder="/profile">
                                        </input>
                                    </div>
                                </div>
                            </fieldset>
                        </div>

                        <fieldset>
                            <button 
                                type="submit"
                                className="invoice__btn" 
                                onClick={ checkNewProvider} >
                                Update provider
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