import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getAllTypes, deleteType, editType } from "./../../modules/TypeManager"
import "./EditType.css"

export const EditType = ({type, setTypes, editTypePopup, setEditTypePopup}) => {
    //Gets logged-in user info 
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;

    const [editedType, setEditedType] = useState({...type});
    // NOTE: There is a known bug on this component such that editedType is not being set and the value cannot be edited. The delete function on the modal works even though the selected value does not show up in the modal. 

    const{typeId} = useParams()

    //Sets types on load
    useEffect(() => {
        getAllTypes(sessionUserId)
            .then(setTypes)
    }, []);


    //Executes the delete function and re-renders page
    const handleDeleteType = (e) => {
        e.preventDefault()
        deleteType(type.id)
        .then(() => getAllTypes(sessionUserId).then(setTypes));
        setEditTypePopup(false)
    };

    //Executes the edit function and re-renders page
    const handleEditType = (e) => {
        e.preventDefault()
        editType(editedType)
        .then(() => getAllTypes(sessionUserId).then(setTypes));
        setEditedType({name: "", userId: sessionUserId})
        setEditTypePopup(false)
    }

    const handleInputChange = (event) => {
        const newEditedType = {...editedType}
        let selectedVal = event.target.value
        //Need to check for empty string
 
        newEditedType[event.target.id] = selectedVal
        setEditedType(newEditedType)
    };

    //Checks if popup link was selected and then pops up new window
    return (editTypePopup) ? (
        <div className="overlay">
            <div className="overlay__inner">
                <h3>You are editing types</h3>
                <input 
                    type="text"
                    className="input__field__form overlay__input"
                    id="newname"
                    onChange={handleInputChange} 
                    value={editedType.name}
                    defaultValue={type.name}
                    autoFocus>
                </input>
                <div className="type__btns">
                    <button className="type__delete__btn" onClick={(e) => handleDeleteType(e)}>Delete</button>
                    <button className="type__cancel__btn" onClick={() => setEditTypePopup(false)}>Cancel</button> 
                    <button className="type__edit__btn" onClick={(e) => handleEditType(e)}>Save</button>
                    
            </div>
            </div>
        </div>
    ) : "";
}