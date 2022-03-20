import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getAllProviders } from "./../../modules/ProviderManager"
import "./RecentProviders.css"

export const RecentProvidersUpdated = ({provider}) =>  {
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

    // Changes date from yyyy-MM-dd to weekday, month date, year
    const changeDateFormat = (inputDate) => {
    let date = new Date(inputDate);
    
    return date.toLocaleString('en-US', {
        // weekday: 'long', // long, short, narrow
        day: 'numeric', // numeric, 2-digit
        year: 'numeric', // numeric, 2-digit
        month: 'long', // numeric, 2-digit, long, short, narrow
        hour: 'numeric', // numeric, 2-digit
        minute: 'numeric', // numeric, 2-digit
        // second: 'numeric', // numeric, 2-digit
    });
   
}

    return (
        <>
        <div className="recent__cards">
            <div className="recent__card">
                <Link to={`/ServiceProviders/${provider.id}`}><p><strong>{provider.name}</strong></p></Link>
                {/* <p className="recent__card__date">Added {changeDateFormat(provider.timestamp)}</p> */}
                <p className="recent__card__date">Updated {changeDateFormat(provider.updatedTimestamp)}</p>
                <div className="spacer"></div>
            </div>
        </div>
        </>
    )
}


