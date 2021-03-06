import React, { useState, useEffect } from "react";
import { addNewType, getAllTypes } from "./../../modules/TypeManager"
import { useNavigate } from "react-router-dom"
import "./CreateType.css"




export const AddType = ({types, setTypes, typeTrigger, setTypeTrigger}) => {
    //Gets logged-in user info 
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const [type, setType] = useState({
        userId: sessionUserId,
        addNewName: "",
    })

    const navigate = useNavigate();

    //Stores input values then sets them in state
    const handleInputChange = (event) => {
        const newType = {...type}
        let selectedVal = event.target.value
        newType[event.target.id] = selectedVal
        setType(newType)
    };

    

    //Checks that popup input is filled in, then saves to database, alerts, clears popup and routes user back to Create Invoice page
    const handleNewType = (event) => {
        if (type.value === "0") {
            window.alert('Fill in all required fields')
        } else {
            const addedName = type.addNewName
            const finalNewName = {
                userId: sessionUserId,
                name: addedName
                }
            addNewType(finalNewName)
                .then(window.alert("A new type has been added"))
                .then(setType({addNewName: "", userId: sessionUserId}))
                .then(getAllTypes(sessionUserId).then(setTypes))
                .then(setTypeTrigger(false))
        }
    }

  
    //Checks if popup link was selected and then pops up new window
    return (typeTrigger) ? (
        <div className="overlay">
            <div className="overlay__inner">
                <h3>What new Type do you want to add?</h3>
                <input 
                    type="text"
                    className="input__field__form overlay__input"
                    id="addNewName"
                    onChange={handleInputChange} 
                    value={type.addNewName}
                    autoFocus>
                </input>
                <div className="overlay__btns">
                    <button className="main__btn overlay__btn" onClick={() => handleNewType()}>Add new Type</button>
                    <button className="main__btn overlay__btn" onClick={() => setTypeTrigger(false)}>Cancel</button> 
                </div>
            </div>
        </div>
    ) : "";
}
