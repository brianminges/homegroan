import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
// import { getAllProviders } from "./../../modules/TypeManager"
// import { getAllInvoices } from "./../../modules/InvoiceManager"
import "./Search.css"

export const Search = () => {

    const [search, setSearch] =  useState({
        value: ""
    });

    const navigate = useNavigate();

    const handleChange = event => {
        const newSearch = {...search}
        let selectedVal = event.target.value
        newSearch["value"] = parseInt(selectedVal)
        setSearch(newSearch)
    }

    const handleSearch = (event) => {
        event.preventDefault()
        if (search.value === 1) {
            navigate("/ServiceProviders")
        } else if (search.value === 2) {
            navigate('/Invoices')
        } 
    }

 

    return (
        <>
            <h2 className="page__title search__title"> Search </h2>
            <div className="search__image">
                    <picture>
                        <img 
                            className="main__image" 
                            src={'./../../images/laundry.png'} 
                            alt="Computer-generated figures fix a washing machine" />
                    </picture>
            </div>
            <div className="search__menus">
                <div>
                    <label
                        htmlFor="search" 
                        className="search__input__label">
                        Search by
                    </label>
                </div>
                <div>
                    <select  
                        className="form__select"
                        id="typeId"
                        onChange={ handleChange }
                        value={ search.value }
                        name="typeId"
                        required >
                        <option value="0">Search ...</option>
                        <option value="1">All Service Providers</option>
                        <option value="2">All Invoices</option>
                    </select>
                </div>
            </div>
            <button 
                type="submit"
                className="main__btn"
                onClick={ handleSearch }>
                Search
            </button>
        </>
    )
}