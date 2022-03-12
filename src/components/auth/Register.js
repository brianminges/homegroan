import React, { useRef } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = ({setAuthUser}) => {
    const firstName = useRef()
    const lastName = useRef()
    const email = useRef()
    const conflictDialog = useRef()
    const navigate = useNavigate()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(res => res.json())
            .then(user => !!user.length)
    }

    const handleRegister = (e) => {
        e.preventDefault()


        existingUserCheck()
            .then((userExists) => {
                if (!userExists) {
                    fetch("http://localhost:8088/users", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            email: email.current.value,
                            name: `${firstName.current.value} ${lastName.current.value}`
                        })
                    })
                        .then(res => res.json())
                        .then(createdUser => {
                            if (createdUser.hasOwnProperty("id")) {
                                // setAuthUser(createdUser)
                                navigate("/")
                            }
                        })
                }
                else {
                    conflictDialog.current.showModal()
                }
            })
        
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog" ref={conflictDialog}>
                <div>Account with that email address already exists</div>
                <button className="dialog__btn" onClick={e => conflictDialog.current.close()}>Close</button>
            </dialog>

            <form className="form__login" onSubmit={handleRegister}>
                <picture>
                        <img className="main__image" src={'./../../images/house.png'} alt="Computer-generated 3D house" />
                    </picture>
                <h1 className="main__hed">Home Groan </h1>
                <h2 className="main__subhed">Please register</h2>
                <div className="name__inputs">
                        <div>
                        <fieldset className="main__inputs name__input">
                            {/* <label htmlFor="firstName"> First Name </label> */}
                            <input ref={firstName} 
                                type="text" 
                                name="firstName" 
                                className="input__field" 
                                placeholder="First name" 
                                required autoFocus />
                        </fieldset>
                        </div>
                        <div>
                        <fieldset className="main__input name__input">
                            {/* <label htmlFor="lastName"> Last Name </label> */}
                            <input ref={lastName} 
                                type="text" 
                                name="lastName" 
                                className="input__field" 
                                placeholder="Last name" 
                                required />
                        </fieldset>
                        </div>
                </div>
                <fieldset className="main__input">
                    {/* <label htmlFor="inputEmail"> Email address </label> */}
                    <input ref={email}
                        id="email__register" 
                        type="email" 
                        name="email" 
                        className="input__field" 
                        placeholder="Email address" 
                        required />
                </fieldset>
                <fieldset>
                    <button type="submit" className="main__btn "> Register </button>
                </fieldset>
            </form>
        </main>
    )
}