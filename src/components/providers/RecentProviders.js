import React from "react";
import "./RecentProviders.css"

export const RecentProviders = ({provider}) =>  {

    return (
        <>
        <div className="recent__cards">
            <div className="recent__card">
                <p><strong>{provider.name}</strong></p>
                <p>Added {provider.timestamp}</p>
                <div className="spacer"></div>
            </div>
        </div>
        </>
    )
}