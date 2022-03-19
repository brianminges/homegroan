import React from "react"

const URL = "http://localhost:8088"

// Gets all types of services
export const getAllTypes = (sessionUserId) => {
    return fetch(`${URL}/types/?userId=${sessionUserId}`)
    .then(res => res.json())
}

// Gets all types of providers
export const getAllProviders = () => {
    return fetch(`${URL}/providers`)
    .then(res => res.json())
}

//Posts a new type 
export const addNewType = (newType) => {
    return fetch(`${URL}/types`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newType)
    }).then(res => res.json())
}

// Deletes type from database
export const deleteType = (id) => {
    return fetch(`${URL}/types/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}
 
// Edits types in database
export const editType = (editedType) => {
    return fetch(`${URL}/types/${editedType.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(editedType)
    }).then(res => res.json())
}