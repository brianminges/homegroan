const remoteURL = "http://localhost:8088"

export const getAllImages = () => {
    return fetch(`${remoteURL}/images`)
    .then(response => response.json())
}