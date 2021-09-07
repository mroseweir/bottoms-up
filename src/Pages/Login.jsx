import React, { useState } from "react";
import Header from "../Components/Header";

function Login() {
  const [logUsername, setLogUsername] = useState("");
  const [logPassword, setLogPassword] = useState("");

  const [signUsername, setSignUsername] = useState("");
  const [signPassword, setSignPassword] = useState("");
  const [signConPassword, setSignConPassword] = useState("");

  const [signUp, setSignUp] = useState(true);

  function handleChangeUser(a) {
    setLogUsername(a);
  }
  function handleChangePass(b) {
    setLogPassword(b);
  }
  function login() {
    console.log(logUsername);
    console.log(logPassword);
  }

  function signUpBtn() {
    setSignUp(false);
  }
  function signUpConfirm() {
    setSignUp(true);
  }

  return (
    <div className="loginContainer">
      <Header />
      <div className="formContainer">
        <div className="inputContainer">
          <h1 className="loginHeader">Login</h1>

          <div>
            {signUp ? null : (
              <div className="signupWindow">
                <h1 className="createAccountHeader">Create Account</h1>
                <div className="signUpContainer2">
                  <input
                    className="signInputForm"
                    placeholder="username"
                  ></input>
                  <input
                    className="signInputForm"
                    placeholder="password"
                  ></input>
                  <input
                    className="signInputForm"
                    placeholder="confirm password"
                  ></input>
                </div>
                <button className="signUpBtn" onClick={() => signUpConfirm()}>
                  Create Account
                </button>
              </div>
            )}
          </div>
          <input
            className="inputForm"
            placeholder="username"
            onChange={(e) => handleChangeUser(e.target.value)}
          ></input>
          <input
            className="inputForm"
            type="password"
            placeholder="password"
            onChange={(e) => handleChangePass(e.target.value)}
          ></input>
        </div>
        <div className="btnContainer">
          <button className="signinBtn" onClick={() => login()}>
            Login
          </button>
        </div>
      </div>
      <div className="signupContainer">
        Don't have an account?<br></br>
        <button className="signupBtn" onClick={() => signUpBtn()}>
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;
