import React, { useState } from "react";
import Header from "../Components/Header";
import axios from "axios";

function Search() {
  const [results, setResults] = useState();
  return (
    <div className="searchContainer">
      <Header />
      <h1 className="searchHeader">Search</h1>
      <div>
        <input className="searchInput" placeholder="enter ingredient"></input>
        <button className="submitInput">Submit</button>
      </div>
    </div>
  );
}

export default Search;
