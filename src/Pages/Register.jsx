import React, { useState } from "react";
import Header from "../Components/Header";
import { toast } from "react-toastify";

function Register({ setAuth }) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = { email, password, name };

      console.log(body);

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("userId", parseRes.userId);

        setAuth(true);
        toast.success("User Registered Successfully!");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="registerPage">
      <Header />
      <div className="registerFormContainer">
        <form onSubmit={onSubmitForm}>
          <h1 className="registerHeader">Register</h1>
          <input
            className="registerInput"
            type="text"
            name="name"
            placeholder="name*"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <input
            className="registerInput"
            type="email"
            name="email"
            placeholder="email*"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            className="registerInput"
            type="password"
            name="password"
            placeholder="password*"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <div>
            <button className="registerBtn">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
