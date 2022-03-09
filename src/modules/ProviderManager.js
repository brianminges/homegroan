import React from "react";

const URL = "http://localhost:8088"

// Gets all states 
export const getAllStates = () => {
    return fetch(`${URL}/states`)
    .then(res => res.json())
}

export const addProvider = (newProvider) => {
    return fetch(`${URL}/providers`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON. stringify(newProvider)
    }).then(res => res.json())
}