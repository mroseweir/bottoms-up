import React, { useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import gif3 from "../assets/gif3.gif";
import { toast } from "react-toastify";
import VerifyAge from "../Components/AgeVerificationModal";

function Search() {
  const [results, setResults] = useState(null);
  const [idSearch, setIdSearch] = useState(null);
  const [input, setInput] = useState("");
  const [complete, setComplete] = useState(true);
  const [instructions, setInstructions] = useState(true);
  const [comment, setComment] = useState("");
  const [optionValue, setOptionValue] = useState("");

  const searchURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

  function handleChange(a) {
    setInput(a);
  }

  const handleSelect = (e) => {
    setOptionValue(e.target.value);
  };

  function submit(input) {
    if (input === "") {
      alert("Must input an ingredient to search!");
    } else {
      axios.get(`${optionValue}${input}`).then((res) => {
        if (res.data.drinks === undefined) {
          alert("No drinks found :(");
        } else {
          let query = res.data.drinks;
          setResults(query);
          setComplete(false);
        }
      });
      if (input.toLowerCase() === "tequila") {
        setComment("Tequila? Rough.");
      } else if (input.toLowerCase() === "vodka") {
        setComment("WOOHOOOOO VODKA!");
      } else if (input.toLowerCase() === "gin") {
        setComment("Clearly you're an individual of good taste.");
      } else if (input.toLowerCase() === "rum") {
        setComment("Cpt. Jack would agree.");
      } else if (input.toLowerCase() === "whiskey") {
        setComment("In a fighting mood today, huh?");
      } else if (input.toLowerCase() === "milk") {
        setComment("The dude abides.");
      } else {
        setComment(`${input}, solid choice.`);
      }
    }
  }

  function clear() {
    setResults(null);
    setComplete(true);
    setInput("");
    setInstructions(true);
  }

  function instructionFire(e) {
    axios.get(`${searchURL}${e}`).then((res) => {
      setIdSearch(res.data.drinks);
      setInstructions(false);
    });
  }

  function closePopup() {
    setInstructions(true);
    setIdSearch("");
  }

  const addFavorite = async (e) => {
    let userId = localStorage.getItem("userId");
    let drinkId = e;

    try {
      const body = { userId, drinkId };

      const response = await fetch(
        "http://localhost:5000/favorite/addfavorite",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const parseRes = await response.json();

      if (parseRes === "Already in Favorites!") {
        toast.error("Already in favorites!");
      } else {
        toast.success("Successfully Added drink to favorites!");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="searchContainer">
      <Header />
      <VerifyAge />
      <div>
        <div className="searchInputContainer">
          <select
            name="selectList"
            className="searchDropdown"
            id="selectList"
            onChange={handleSelect}
          >
            <option value="https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=">
              Ingredient
            </option>
            <option value="https://www.thecocktaildb.com/api/json/v1/1/search.php?s=">
              Name
            </option>
          </select>
          <input
            value={input}
            className="searchInput"
            placeholder="(vodka, tequila, margarita, etc..)"
            onChange={(e) => handleChange(e.target.value)}
          ></input>
        </div>
        <div className="searchBtnsContainer">
          <button className="submitInput" onClick={() => submit(input)}>
            Submit
          </button>
          <button className="submitInput" onClick={() => clear()}>
            Reset
          </button>
        </div>
      </div>
      <div>
        {instructions ? null : (
          <div className="instructionContainer">
            <div key={idSearch[0].id} className="instructionsPopup">
              <h1 className="searchDrinkName">{idSearch[0].strDrink}</h1>

              <ul className="searchIngredientsList">
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure1} {idSearch[0].strIngredient1}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure2} {idSearch[0].strIngredient2}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure3} {idSearch[0].strIngredient3}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure4} {idSearch[0].strIngredient4}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure5} {idSearch[0].strIngredient5}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure6} {idSearch[0].strIngredient6}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure7} {idSearch[0].strIngredient7}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure8} {idSearch[0].strIngredient8}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure9} {idSearch[0].strIngredient9}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure10} {idSearch[0].strIngredient10}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure11} {idSearch[0].strIngredient11}
                </li>
                <li key={idSearch[0].id}>
                  {idSearch[0].strMeasure12} {idSearch[0].strIngredient12}
                </li>
              </ul>
              <h3 className="searchInstructions">
                {idSearch[0].strInstructions}
              </h3>
              <div>
                <button
                  className="searchFaveBtn"
                  data-drinkid={idSearch[0].idDrink}
                  onClick={(e) => {
                    addFavorite(e.target.dataset.drinkid);
                  }}
                >
                  Add To Favorites
                </button>
              </div>
              <div>
                <button className="searchFaveBtn" onClick={() => closePopup()}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {complete ? (
          <div className="tempResults">
            <p className="tempInstruction">enter ingredient above to search</p>
            <img src={gif3} alt="" className="cocktailGlass2" />
          </div>
        ) : (
          <div>
            <div className="tempComment">{comment}</div>
            <div className="resultsContainer">
              {results.map((drink, index) => (
                <div key={results[index].id} className="resultsCard">
                  <p className="searchDrinkName">{results[index].strDrink}</p>
                  <img
                    src={`${results[index].strDrinkThumb}`}
                    className="searchImg"
                    alt="uh oh, gif no load"
                  ></img>
                  <div>
                    <button
                      className="instructionsBtn"
                      data-drinkid={results[index].idDrink}
                      onClick={(e) => instructionFire(e.target.dataset.drinkid)}
                    >
                      instructions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
