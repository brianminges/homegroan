import React, { useState, useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAllStates, editProvider, getAllProviders, getProviderById } from "./../../modules/ProviderManager"

import { getAllTypes } from "./../../modules/TypeManager"
import { AddType } from "./../types/CreateType"
import { EditType } from "./../types/EditType"
import { RecentProviders } from "./RecentProviders"
import { RecentProvidersUpdated } from "./RecentProvidersUpdated"
import './../invoices/CreateInvoice.css'
import './AddServiceProvider.css'
import "./../HomeGroan.css"

export const EditServiceProvider = () => {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const [provider, setProvider] = useState ({
        userId: sessionUserId,
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        typeId: "",
        officePhone: "",
        cellPhone: "",
        emailaddress: "",
        website: "",
        twitter: "",
        facebook: "",
        timestamp: new Date().toLocaleString()
    })


    const updateProvider = (event) => {
        event.preventDefault()
        setIsLoading(true);
        if ((provider.name === "") || (provider.typeId === "")) {
            window.alert('Name and Type are required fields')
        } else {
            const editedProvider ={
                id: providerId,
                name: provider.name,
                address: provider.address,
                city: provider.city,
                state: provider.state,
                zip: provider.zip,
                typeId: provider.typeId,
                phone: provider.phone,
                emailaddress: provider.emailaddress,
                twitter: provider.twitter,
                facebook: provider.facebook,
                updatedTimestamp: new Date
            };
        
            editProvider(editedProvider)
                .then(() => navigate(-1)
        )}
    }




    









    //Sets state of 'Add new type' popup to false on load
    const [typePopup, setTypePopup] = useState(false)

    //Sets state of 'Edit new type' popup to false on load
    const [editTypePopup, setEditTypePopup] = useState(false)

    const [typeObject, setTypeObject] = useState("");

    // Checks to make sure a type is selected before routing to edit popup
    const editThisType = () => {
        if (provider.typeId === "") {
            providerDialog.current.showModal()
        } else {
            setEditTypePopup(true)
        }
    }

    const [isLoading, setIsLoading] = useState(false);
    const {providerId} = useParams();
    const navigate = useNavigate();

    
    
    


    // Sets states dropdown on load
    const [states, setStates] = useState([])

    useEffect(() => {
        getAllStates()
            .then(setStates)
    }, []);


    // Sets types dropdown on load
    const [types, setTypes] = useState([]);
    const [sortedTypes, setSortedTypes] = useState([]);


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





    useEffect(() => {
        getProviderById(providerId)
            .then(provider => {
                setProvider(provider);
                setIsLoading(false);
            })
    }, [providerId]);


    //Submits 'edited provider' object
    const handleFieldChange = (event) => {
        const updatedProvider = {...provider}
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        if (event.target.id.includes("type")) {
            const selectedType = types.filter((type) => {
                return type.id === parseInt(selectedVal)
            })
            setTypeObject(selectedType[0])
        }
        updatedProvider[event.target.id] = selectedVal
        setProvider(updatedProvider)
    };




    const handleInputChange = (event) => {
        const newProvider = {...provider}
        let selectedVal = event.target.value
        if (event.target.id.includes("Id")) {
            selectedVal = parseInt(selectedVal)
        }
        if (event.target.id.includes("type")) {
            const selectedType = types.filter((type) => {
                return type.id === parseInt(selectedVal)
            })
            setTypeObject(selectedType[0])
        }
        newProvider[event.target.id] = selectedVal
        setProvider(newProvider)
    };




    // Fetches all providers and sets in state
    const [providers, setProviders] = useState([]);
    const [sortedProviders, setSortedProviders] = useState([]);
    
    const getProviders = () => {
        return getAllProviders(sessionUserId).then(dataFromAPI => {
            setProviders(dataFromAPI)
        });
    };

    useEffect(() => {
        getProviders()
    }, [])

    useEffect(() => {
        if (providers.length > 0) {
            const tempProviders = providers.sort((a,b) => a.updatedTimestamp < b.updatedTimestamp ? 1 : -1)
            setSortedProviders(tempProviders)}
    }, [providers])





    const providerDialog = useRef()

    return (
        <>
        <dialog className="dialog" ref={providerDialog}>
            <div className="dialog__login">Select from the menu before clicking Edit.</div>
            <button className="dialog__btn" onClick={e => providerDialog.current.close()}>Close</button>
        </dialog>

        <h2 className="page__title"> Edit Service Provider</h2>
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
                    <p>*required</p>
                    <fieldset className="form__input__fieldset">
                        <label 
                            htmlFor="name" 
                            className="form__input__label">
                            Name*
                        </label>
                        <input 
                            type="text" 
                            className="input__field__form" 
                            id="name" 
                            onChange={handleFieldChange} 
                            value={provider.name}
                            required autoFocus>
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

                    <div className="form__inputs form__firstrow">
                        <fieldset className="form__input__fieldset">
                            <label
                                htmlFor="city" 
                                className="form__input__label"
                                id="label__city">
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
                                className="form__input__label"
                                id="label__state">
                                State
                            </label>
                            <select 
                                className="form__select"
                                id="state"
                                onChange={handleFieldChange}
                                value={provider.state}
                                name="state"
                                required >
                                <option value="0"></option>
                                {states.map(
                                    state => (
                                            <option key={state.id} value={state.abbreviation}>{state.abbreviation}</option>
                                    ))}
                            </select>
                        </fieldset>

                        <fieldset className="form__input__fieldset ">
                            <label
                                htmlFor="zip" 
                                className="form__input__label"
                                id="label__zip">
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
                        </div>
                        <div  className="form__textlinks__provider">
                            <div className="form__textlink form__textlink__left__type"> <span onClick={() => setTypePopup(true)}>Add new type</span> </div>
                            <div className="form__textlink form__textlink__right"> <span onClick={() => editThisType()}>Edit</span> </div>

                            <AddType types={types} setTypes={setTypes} typeTrigger={typePopup} setTypeTrigger={setTypePopup} handleInputChange={handleInputChange}/>
                            <EditType type={typeObject} setTypes={setTypes} editTypePopup={editTypePopup} setEditTypePopup={setEditTypePopup} />
                        </div>
                    </fieldset>

                    <div className="subhed__hr"></div>

                    <h3>Contact information</h3>
                    <div className="form__inputs form__firstrow">
                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="officePhone" 
                                className="form__input__label"
                                id="label__officePhone">
                                Office 
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form provider__contact" 
                                id="officePhone" 
                                onChange={handleFieldChange} 
                                value={provider.officePhone} 
                                placeholder="555-555-5555">
                            </input>
                        </fieldset>

                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="cellPhone" 
                                className="form__input__label"
                                id="label__cellPhone">
                                Cellular
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form provider__contact" 
                                id="cellPhone" 
                                onChange={handleFieldChange} 
                                value={provider.cellPhone} 
                                placeholder="555-555-5555">
                            </input>
                        </fieldset>

                        <fieldset className="form__input__fieldset">
                            <label 
                                htmlFor="emailaddress" 
                                className="form__input__label"
                                id="label__email">
                                Email
                            </label>
                            <input 
                                type="email" 
                                className="input__field__form" 
                                id="emailaddress" 
                                onChange={handleFieldChange} 
                                value={provider.emailaddress} 
                                placeholder="email@email.com">
                            </input>
                        </fieldset>
                    </div>

                    <div className="form__inputs form__firstrow">
                        <fieldset className="form__input__fieldset form">
                            <label 
                                htmlFor="twitter" 
                                className="form__input__label">
                                Twitter
                            </label>
                            <input 
                                type="text" 
                                className="input__field__form provider__contact" 
                                id="twitter" 
                                onChange={handleFieldChange} 
                                value={provider.twitter} 
                                placeholder="@twitter">
                            </input>
                        </fieldset>

                        <fieldset className="form__input__fieldset form">
                            <label 
                                htmlFor="facebook" 
                                className="form__input__label">
                                Facebook
                            </label>
                            <input 
                                type="url" 
                                className="input__field__form provider__contact" 
                                id="facebook" 
                                onChange={handleFieldChange} 
                                value={provider.facebook} 
                                placeholder="/facebook">
                            </input>
                        </fieldset>

                        <fieldset className="form__input__fieldset form">
                            <label 
                                htmlFor="website" 
                                className="form__input__label">
                                Web site
                            </label>
                            <input 
                                type="url" 
                                className="input__field__form" 
                                id="website" 
                                onChange={handleFieldChange} 
                                value={provider.website} 
                                placeholder="Website.com">
                            </input>
                        </fieldset>
                    </div>
                    </form>

                    <div>
                        <fieldset className="fieldset__button">
                            <button 
                                type="submit"
                                className="invoice__btn"
                                onClick={updateProvider} >
                                Submit
                            </button>
                        </fieldset>
                    </div>
                </div>

            <div className="page__grid__right__provider">
                    <h3>Recently updated</h3>
                    {providers.slice(0,6).map(provider => {
                        if (provider.updatedTimestamp) {
                            return <RecentProvidersUpdated 
                            key={provider.id}
                            provider={provider}/>}
                        }
                    )}
            </div>
        </div>
        </>
    )
}


