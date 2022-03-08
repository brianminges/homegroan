import React from "react"

const URL = "http://localhost:8088"

// Gets all types of services
export const getAllTypes = () => {
    return fetch(`${URL}/types`)
    .then(res => res.json())
}