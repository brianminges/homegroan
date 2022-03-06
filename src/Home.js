import React from "react";
import "./components/auth/Login.css"
import "./components/HomeGroan.css"

export const Home = () => {
  const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
  const sessionUserName = sessionUser.name

  return (
    <>
      <main>
        <section className="form__login">
          <picture>
            <img className="main__image" src={'./../../images/house.png'} alt="Computer-generated 3D house" />
          </picture>
          <h1 className="main__hed">Home Groan</h1>
          <h2 className="main__subhed">Ugh ... sorry to see you, {sessionUserName}. What do you want to do?</h2>
        </section>
        <section>
          <div  className="option__btns">
            <button className="main__btn">Search</button>
            <button className="main__btn">Add Service Provider</button>
            <button className="main__btn">Create New Invoice</button>
          </div> 
        </section>

      </main>
      
    </>
  );
};