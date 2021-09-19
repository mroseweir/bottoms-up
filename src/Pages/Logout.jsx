import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Header from "../Components/Header";

function Logout({ setAuth }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
    setEmail(localStorage.getItem("email"));
  }, []);

  function logoutFire(e) {
    e.preventDefault();
    toast.success(`${userName} has been logged out!`);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    setAuth(false);
  }

  return (
    <div>
      <Header />
      <div className="logoutContainer">
        <div className="logoutBox">
          <h1 className="logoutHeader">User Info: </h1>
          <p>{userName}</p>
          <p>{email}</p>

          <button className="logoutBtn" onClick={(e) => logoutFire(e)}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
