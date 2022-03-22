import React, { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { getAllStates, addProvider, getAllProviders } from "./../../modules/ProviderManager"
import { getAllTypes } from "./../../modules/TypeManager"
import { RecentProviders } from "./RecentProviders"
import { AddType } from "./../types/CreateType"
import { EditType } from "./../types/EditType"
import './AddServiceProvider.css'
import "./../HomeGroan.css"

export const AddServiceProvider = () => {
    //Gets logged-in user info 
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const navigate = useNavigate();
  

    // Fetches all states and sets in state for states dropdown on load
    const [states, setStates] = useState([])

    useEffect(() => {
        getAllStates()
            .then(setStates)
    }, []);    


    // Fetches all providers and sets in state for providers dropdown on load
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

    // Sorts all providers by most recent for 'Recently Added' box
    useEffect(() => {
        if (providers.length > 0) {
            const tempProviders = providers.sort((a,b) => (parseInt(a.timestamp) > parseInt(b.timestamp)) ? 1 : -1)
            setSortedProviders(tempProviders)}
    }, [providers])




// TYPES TYPES TYPES TYPES *****************************************************************************
    //Sets types dropdown on load
    const [types, setTypes] = useState([]);
    const [sortedTypes, setSortedTypes] = useState([]);

    //Sets state for type object 
    const [typeObject, setTypeObject] = useState("");

    // Fetches all types and sets in state for types dropdown on load
    useEffect(() => {
        getAllTypes(sessionUserId)
            .then(setTypes)
    }, []);

    // Sorts all types alphabetically for dropdown on load
    useEffect(() => {
        if (types.length > 0) {
            // const tempTypes = types.sort((a,b) => (a.name > b.name) ? 1 : -1)
            const tempTypes = types.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
            setSortedTypes(tempTypes)}
    }, [types])
    
    //Sets state of 'Add new type' popup to false on load
    const [typePopup, setTypePopup] = useState(false)

    //Sets state of 'Edit new type' popup to false on load
    const [editTypePopup, setEditTypePopup] = useState(false)

    // Checks to make sure a type is selected before routing to edit popup
    const editThisType = () => {
        if (provider.typeId === "") {
            providerDialog.current.showModal()
        } else {
            setEditTypePopup(true)
        }
    }
// *****************************************************************************
    


// Sets empty object to receive user-input values   
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
        timestamp: new Date()
        // .toLocaleString()
    })

    // Updates state for each user keystroke
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

    // Checks for values in required fields and then posts to database
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

    const providerDialog = useRef()

    return (
        <>
            <dialog className="dialog" ref={providerDialog}>
                <div className="dialog__login">Select from the menu before clicking Edit.</div>
                <button className="dialog__btn" onClick={e => providerDialog.current.close()}>Close</button>
            </dialog>

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
                                onChange={handleInputChange} 
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
                                onChange={handleInputChange} 
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange} 
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
                                    onChange={handleInputChange} 
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
                                    onChange={handleInputChange} 
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
                                    onChange={handleInputChange} 
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
                                    onChange={handleInputChange} 
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
                                    onChange={handleInputChange} 
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
                                    onClick={handleSubmit} >
                                    Submit
                                </button>
                            </fieldset>
                        </div>
                    </div>

                <div className="page__grid__right__provider">
                    <h3>Recently added</h3>
                    {providers.slice(0,5).map(provider =>
                    <RecentProviders 
                    key={provider.id}
                    provider={provider}/>
                    )}

                </div>
            </div>
        </>
    )
}