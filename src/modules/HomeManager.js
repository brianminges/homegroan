import React from "react";

const remoteURL = "http://localhost:8088"

export const getAllUsers = () => {
    return fetch(`${remoteURL}/users?`)
    .then(response => response.json())
}