import React from "react"

const URL = "http://localhost:8088"

// Gets all types of services
export const getAllTypes = () => {
    return fetch(`${URL}/types`)
    .then(res => res.json())
}

// Gets all types of providers
export const getAllProviders = () => {
    return fetch(`${URL}/providers`)
    .then(res => res.json())
}

//Posts a new type 
export const addType = (newType) => {
    return fetch(`${URL}/types`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newType)
    }).then(res => res.json())
}



