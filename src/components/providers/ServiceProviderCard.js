import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import "./ServiceProviderCard.css"
export const ServiceProviderCard = ({ provider, handleDeleteProvider, handleMakeFavorite, handleMakeUnfavorite }) => {
    
    const navigate = useNavigate();

    let favoriteResult = ""
    if (provider.favorite === true) {
        favoriteResult = <FontAwesomeIcon className="color" icon={faStar} /> 
    } 
 
    return (
        <>
        <div className="provider__card">
                <div>
                    <p className="provider__favorite">{favoriteResult}</p>
                    <h3>{provider.name}</h3>
                    <p>{provider.address}</p>
                    <p>{provider.city} {provider.state} {provider.zip}</p>
                    <p>Office: {provider.officePhone}</p> <p>Cell: {provider.officePhone}</p>
                    <p><a href={`http://www.${provider.website}`} target="_blank" rel="noopener noreferrer">{provider.website}</a></p>
                    <p><a href={`mailto:${provider.emailaddress}`}>{provider.emailaddress}</a></p>
                    <p><a href={`http://www.twitter.com/${provider.twitter}`} target="_blank" rel="noopener noreferrer"> {provider.twitter}</a></p>
                    <p><a href={`http://www.facebook.com${provider.facebook}`} target="_blank" rel="noopener noreferrer"> {provider.facebook}</a></p>
                </div>
                <div className="provider__buttons">
                    <div>
                        <button
                            id="provider__delete__button"
                            onClick={() => handleDeleteProvider(provider.id)}>
                            Delete
                        </button>
                    </div>
                    <div>
                        <Link to={`/ServiceProviders/${provider.id}`}>
                            <button id="provider__details__button">Details</button>
                        </Link>
                    </div>
                    <div>
                        <button
                            id="provider__favorite__button"
                            onClick={() => {
                                if (provider.favorite === false) {
                                    handleMakeFavorite(provider.id) 
                                } else if (provider.favorite === true) {
                                    handleMakeUnfavorite(provider.id)
                                }
                            }} > 
                            Favorite
                        </button>
                    </div>
                    <div>
                        <button
                            id="provider__edit__button"
                            onClick={() => {navigate(`/ServiceProviders/${provider.id}/Edit`)}}>
                            Edit
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}
 