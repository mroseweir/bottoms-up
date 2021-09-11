import React from "react";
import { toast } from "react-toastify";
import Header from "../Components/Header";

function Logout({ setAuth }) {
  function logoutFire(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("User has been logged out.");
  }

  return (
    <div>
      <Header />
      <div className="logoutContainer">
        <h1 className="logoutHeader">
          You are succesfully logged in! <br></br> Click below to logout.
        </h1>
        <button onClick={(e) => logoutFire(e)}>Logout</button>
      </div>
    </div>
  );
}

export default Logout;
