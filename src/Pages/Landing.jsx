import React from "react";
import Header from "../Components/Header";
import gif2 from "../assets/gif2.gif";
import VerifyAge from "../Components/AgeVerificationModal";

function Landing() {
  return (
    <div className="homeContainer">
      <Header />
      <VerifyAge />
      <h1 className="mainHeader">BOTTOMS UP!</h1>
      <img src={gif2} alt="gif didn't load" className="cocktailGlass" />
      <h2 className="randInfo">
        Unsure of what to mix up next? <br></br> The random page might have
        something that interests you.
      </h2>
    </div>
  );
}

export default Landing;
