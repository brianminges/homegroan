import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProviders } from "./../../modules/ProviderManager"
import "./RecentProviders.css"

export const RecentProviders = ({provider}) =>  {
    const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
    const sessionUserId = sessionUser.id;
    
    const [providers, setProviders] = useState([]);

    const getProviders = () => {
        return getAllProviders(sessionUserId).then(dataFromAPI => {
            setProviders(dataFromAPI)
        });
    };

    useEffect(() => {
        getProviders()
    }, [])

    return (
        <>
        <div className="recent__cards">
            <div className="recent__card">
                <Link to={`/ServiceProviders/${provider.id}`}><p><strong>{provider.name}</strong></p></Link>
                <p>Added {provider.timestamp}</p>
                <div className="spacer"></div>
            </div>
        </div>
        </>
    )
}



