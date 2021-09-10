import React, { useState } from "react";
import Header from "../Components/Header";

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

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      localStorage.setItem("token", parseRes.token);

      setAuth(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="registerPage">
      <Header />
      <div className="registerFormContainer">
        <form onSubmit={onSubmitForm}>
          <input
            className="registerInput"
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            className="registerInput"
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            className="registerInput"
            type="text"
            name="name"
            placeholder="name"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
