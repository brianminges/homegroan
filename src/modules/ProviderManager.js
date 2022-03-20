import React from "react";

const URL = "http://localhost:8088"


// Gets all states for address dropdown menu 
export const getAllStates = () => {
    return fetch(`${URL}/states`)
    .then(res => res.json())
}

// Gets all providers
export const getAllProviders = (sessionUserId) => {
    return fetch(`${URL}/providers?userId=${sessionUserId}`)
    .then(res => res.json())
}

// Gets all providers with type
export const getAllProvidersByType = (sessionUserId) => {
    return fetch(`${URL}/providers?userId=${sessionUserId}&_expand=type`)
    .then(res => res.json())
}

// Gets all providers by ID
export const getProviderById = (providerId) => {
    return fetch(`${URL}/providers/${providerId}`)
    .then(res => res.json())
}


// Edits provider in database
export const editProvider = (editedProvider) => {
    return fetch(`${URL}/providers/${editedProvider.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON. stringify(editedProvider)
    }).then(res => res.json())
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