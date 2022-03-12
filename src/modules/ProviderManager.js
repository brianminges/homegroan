import React from "react";

const URL = "http://localhost:8088"

// Gets all states for address dropdown menu 
export const getAllStates = () => {
    return fetch(`${URL}/states`)
    .then(res => res.json())
}

// Gets providers
export const getAllProviders = () => {
    return fetch(`${URL}/providers`)
    .then(res => res.json())
}


export const getAllProvidersByType = () => {
    return fetch(`${URL}/providers?_expand=type`)
    .then(res => res.json())
}

export const getProviderById = (providerId) => {
    return fetch(`${URL}/providers/${providerId}?_expand=type`)
    .then(res => res.json())
}



// Posts new provider to database
export const addProvider = (newProvider) => {
    return fetch(`${URL}/providers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON. stringify(newProvider)
    }).then(res => res.json())
}

// Deletes provider from database
export const deleteProvider = (id) => {
    return fetch(`${URL}/providers/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}