import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "./Home.css"
import "./components/auth/Login.css"
import "./components/HomeGroan.css"


export const Home = () => {
  const sessionUser = JSON.parse(window.sessionStorage.getItem("homegroan_user"))
  const sessionUserName = sessionUser.name

  const navigate = useNavigate();


  return (
    <>
      <main>
        <section className="form__login">
          <picture>
            <img className="main__image" src={'./../../images/house2.png'} alt="Computer-generated 3D house" />
          </picture>
          <h1 className="main__hed">Home Groan</h1>
          <h2 className="main__subhed">Welcome back, {sessionUserName}. What do you want to do?</h2>
        </section>
        <section>
          <div  className="option__btns">
            <button 
              className="main__btn" 
              onClick={() => {navigate(`/Search`)}}>Search</button>
            <button 
              className="main__btn" 
              onClick={() => {navigate(`/AddServiceProvider`)}}>Add Provider</button>
            <button 
              className="main__btn" 
              onClick={() => {navigate(`/CreateInvoice`)}}>Create Invoice</button>
          </div> 
        </section>
      </main>
    </>
  );
};