import React, { useEffect, useState } from "react";
import stopgif from "../assets/stopgif.gif";

function VerifyAge() {
  let local = JSON.parse(localStorage.getItem("ageVerification"));

  const [ageVerify, setAgeVerify] = useState(local);

  useEffect(() => {
    console.log(local);
  }, []);

  function legalAge() {
    localStorage.setItem("ageVerification", true);
    setAgeVerify(true);
    console.log(ageVerify);
  }

  return (
    <div>
      {ageVerify ? null : (
        <div className="verificationModalContainer">
          <div className="verificationModal">
            <div>
              <img
                src={stopgif}
                alt="gif didn't load"
                className="cocktailGlass"
              />
              <div>
                <h1 className="verificationText">
                  HEY YOU! <br></br>
                  Are you of legal drinking age?
                </h1>
              </div>
              <div>
                <button className="verificationBtns">No</button>
                <button className="verificationBtns" onClick={legalAge}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyAge;
