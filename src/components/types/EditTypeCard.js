import React from "react";
import "./EditType.css"

export const EditTypeCard = (editType, {type, handleDeleteType}) => {

    if (editType === type.value) {
        return (
            <>
            <div className="editing__overlay">
                <div>
                    <p><strong>{type.name}</strong></p>
                </div>
                <div className="type__btns">
                    <button className="type__delete__btn" onClick={() => handleDeleteType()}>Delete</button>
                    <button className="type__edit__btn">Edit</button>
                </div>
            </div>
            <hr></hr>
            </>
        )
    }
    
}

