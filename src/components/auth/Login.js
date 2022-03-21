import React, { useRef } from "react"
import { Link, useNavigate } from "react-router-dom";
import "./Login.css"
import "./../HomeGroan.css"

export const Login = ({setAuthUser}) => {
    const email = useRef()
    const existDialog = useRef()
    const navigate = useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists) {
                    setAuthUser(exists)
                    navigate("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main>
            <dialog className="dialog" ref={existDialog}>
                <div className="dialog__login">Enter a valid email address.</div>
                <button className="dialog__btn" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <section>
                <form className="form__login" onSubmit={handleLogin}>
                    <picture>
                        <img className="main__image" id="house1" src={'./../../images/house1.png'} alt="Computer-generated 3D house" />
                    </picture>
                    <h1 className="main__hed">Home Groan</h1>
                    <h2 className="main__subhed">Please sign in</h2>
                    <fieldset className="main__input">
                        <input 
                            ref={email} 
                            type="email"
                            id="email"
                            className="input__field"
                            placeholder="Email address"
                            required autoFocus /> 
                    </fieldset>
                    <fieldset>
                        <button 
                            type="submit"
                            className="main__btn">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="register__link">
                <Link to="/register">No account? Sign up here</Link>
            </section>
        </main>
    )
}

