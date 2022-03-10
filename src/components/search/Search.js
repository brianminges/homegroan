import React from "react"
import "./Search.css"

export const Search = () => {

 

    return (
        <>
            <h2 className="page__title search__title"> Search </h2>
            <div className="search__image">
                    <picture>
                        <img 
                            className="main__image" 
                            src={'./../../images/laundry.png'} 
                            alt="Computer-generated figure holding a large wrench" />
                    </picture>
            </div>
            <div className="search__menus">
                <div>
                    {/* <label
                        htmlFor="search" 
                        className="search__input__label">
                        Search by
                    </label> */}
                </div>
                <div>
                    <select  
                        className="form__select"
                        id="typeId"
                        // onChange={ }
                        // value={ }
                        name="typeId"
                        required >
                        <option value="0">Please select ...</option>
                        <option vlaue="1">All Providers</option>
                        <option vlaue="2">All Invoices</option>
                    </select>
                </div>
            </div>
            <button 
                type="submit"
                className="main__btn">
                Search
            </button>
        </>
    )
}