import React from "react";
import { toast } from "react-toastify";
import Header from "../Components/Header";

function Logout({ setAuth }) {
  function logoutFire(e) {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAuth(false);
    toast.success("User has been logged out.");
  }

  return (
    <div>
      <Header />
      <div className="logoutContainer">
        <h1 className="logoutHeader">
          You are succesfully logged in! <br></br>
          Head on over to the random page to find a new drink! <br></br>
          If you would like to search by a specific ingredient, Head over to the
          search page! <br></br>
          When you are all done, come back here and click below to logout.
        </h1>
        <button className="logoutBtn" onClick={(e) => logoutFire(e)}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
