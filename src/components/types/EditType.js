import React, { useState, useEffect } from "react";
import {getAllTypes, deleteType } from "./../../modules/TypeManager"
import "./EditType.css"

export const EditType = ({invoice, types, setTypes, editTypePopup, setEditTypePopup}) => {
    //Gets logged-in user info 
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const [editedType, setEditedType] = useState([]);

    // const [sortedTypes, setSortedTypes] = useState([]);

    //Sets types on load
    useEffect(() => {
        getAllTypes(sessionUserId)
            .then(setTypes)
    }, []);

    
    // // Alphabetizes types  
    // useEffect(() => {
    //     if (types.length > 0) {
    //         const tempTypes = types.sort((a,b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1)
    //         setSortedTypes(tempTypes)}
    // }, [types])


    //Executes the delete function and re-renders page
    const handleDeleteType = (id) => {
        deleteType(id)
        .then(() => getAllTypes(sessionUserId).then(setTypes));
    };

    const handleInputChange = (event) => {
        const newTypes = {...editedType}
        let selectedVal = event.target.value
        //Need to check for empty string
 
        newTypes[event.target.id] = selectedVal
        setEditedType(newTypes)
    };

    //Checks if popup link was selected and then pops up new window
    return (editTypePopup) ? (
        <div className="overlay">
            <div className="overlay__inner">
                <h3>You are editing types</h3>
                <input 
                    type="text"
                    className="input__field__form overlay__input"
                    id="typeId"
                    onChange={handleInputChange} 
                    value={invoice.typeId}
                    autoFocus>
                </input>
                <div className="type__btns">
                    <button className="type__delete__btn" onClick={() => handleDeleteType()}>Delete type</button>
                    <button className="type__cancel__btn" onClick={() => setEditTypePopup(false)}>Cancel</button> 
                    <button className="type__edit__btn" >Save edit</button>
                    
            </div>
            </div>
        </div>
    ) : "";
}