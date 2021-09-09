import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";

function Login({ setAuth }) {
  return (
    <div className="loginContainer">
      <Header />
      <div className="formContainer">
        <div className="inputContainer">
          <h1 className="loginHeader">Login</h1>
          <input className="inputForm" placeholder="username"></input>
          <input
            className="inputForm"
            type="password"
            placeholder="password"
          ></input>
        </div>
        <div className="btnContainer">
          <button className="signinBtn">Login</button>
        </div>
      </div>
      <div className="signupContainer">
        <p>Don't have an account?</p>
        <Link to="/register" className="signupBtn">
          Sign Up!
        </Link>
      </div>
    </div>
  );
}

export default Login;
