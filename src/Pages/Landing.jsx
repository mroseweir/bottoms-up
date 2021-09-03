import React from "react";
import Header from "../Components/Header";
import cocktailGlass from "../assets/cocktailGlass.svg";

function Landing() {
  return (
    <div className="homeContainer">
      <Header />
      <h1 className="mainHeader">BOTTOMS UP!</h1>
      <img src={cocktailGlass} alt="" className="cocktailGlass" />
      <h2 className="randInfo">
        Unsure of what to mix up next? <br></br> Check out the Random page to
        find a new drink!
      </h2>
    </div>
  );
}

export default Landing;
