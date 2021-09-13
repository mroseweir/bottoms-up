import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../Components/Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("User successfully logged in!");
      } else {
        setAuth(false);
        setInputs({ password: "" });
        toast.error("Email or Password is incorrect");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="loginContainer">
      <Header />
      <div className="formContainer">
        <div className="inputContainer">
          <h1 className="loginHeader">Login</h1>
          <form onSubmit={onSubmitForm}>
            <input
              className="inputForm"
              type="email"
              name="email"
              placeholder="email"
              value={email}
              onChange={(e) => onChange(e)}
            ></input>
            <input
              className="inputForm"
              type="password"
              name="password"
              placeholder="password"
              value={password}
              onChange={(e) => onChange(e)}
            ></input>
            <button className="signinBtn">Login</button>
          </form>
        </div>
      </div>
      <div className="signupContainer">
        <p>Don't have an account?</p>
        <Link to="/register" className="signupBtn">
          sign up
        </Link>
      </div>
    </div>
  );
}

export default Login;
