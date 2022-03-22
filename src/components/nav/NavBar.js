import React from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({clearUser, isAuthenticated}) => {

    const history = useNavigate()

    const handleLogout = () => {
        clearUser();
        history('/');
    }

    return (
        <>
            <nav className="navbar__background">
                <div className="navbar">
                    <div>
                        <picture>
                            <Link to="/"><img className="navbar__image" src={'./../../images/house.png'} alt="Computer-generated 3D house" /> </Link>
                        </picture>
                    </div>
                    <div>
                        <ul className="navbar__items">
                            <li className="navbar__item"><Link className="navbar__item" to="/">Home</Link></li>
                            {isAuthenticated
                                ? <li className="navbar__item" >
                                    <Link className="navbar__item" to="/Search">Search</Link>
                                </li>
                                : null}
                            {isAuthenticated
                                ? <li className="navbar__item">
                                    <Link className="navbar__item" to="/AddServiceProvider">Add Provider</Link>
                                </li>
                                : null}
                            {isAuthenticated 
                                ? <li className="navbar__item">
                                    <Link className="navbar__item" to="/CreateInvoice">Create Invoice</Link>
                                </li>
                                : null}
                            {isAuthenticated
                                ? <li className="navbar__item">
                                    <span className="navbar__item" onClick={handleLogout}>Logout</span>
                                </li>
                                : null}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}