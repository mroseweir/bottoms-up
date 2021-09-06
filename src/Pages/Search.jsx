import React, { useState } from "react";
import Header from "../Components/Header";
import axios from "axios";
import gif3 from "../assets/gif3.gif";

function Search() {
  const [results, setResults] = useState(null);
  const [idSearch, setIdSearch] = useState(null);
  const [input, setInput] = useState("");
  const [complete, setComplete] = useState(true);
  const [instructions, setInstructions] = useState(true);
  const [comment, setComment] = useState("");

  const baseURL = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";
  const searchURL = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

  function handleChange(a) {
    setInput(a);
  }

  function submit(input) {
    if (input === "") {
      console.log("fail");
      alert("Must input an ingredient to search!");
    } else {
      console.log(input);
      axios.get(`${baseURL}${input}`).then((res) => {
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
    console.log(e);
    axios.get(`${searchURL}${e}`).then((res) => {
      setIdSearch(res.data.drinks);
      setInstructions(false);
    });
  }

  function closePopup() {
    console.log(idSearch);
    setInstructions(true);
    setIdSearch("");
  }

  function addFavorite() {
    alert("Added to favorites!");
  }

  return (
    <div className="searchContainer">
      <Header />
      <div>
        <div className="searchInputContainer">
          <input
            value={input}
            className="searchInput"
            placeholder="(vodka, tequila, gin, etc..)"
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
            <div className="instructionsPopup">
              <h1 className="searchDrinkName">{idSearch[0].strDrink}</h1>

              <ul className="searchIngredientsList">
                <li>
                  {idSearch[0].strMeasure1} {idSearch[0].strIngredient1}
                </li>
                <li>
                  {idSearch[0].strMeasure2} {idSearch[0].strIngredient2}
                </li>
                <li>
                  {idSearch[0].strMeasure3} {idSearch[0].strIngredient3}
                </li>
                <li>
                  {idSearch[0].strMeasure4} {idSearch[0].strIngredient4}
                </li>
                <li>
                  {idSearch[0].strMeasure5} {idSearch[0].strIngredient5}
                </li>
                <li>
                  {idSearch[0].strMeasure6} {idSearch[0].strIngredient6}
                </li>
                <li>
                  {idSearch[0].strMeasure7} {idSearch[0].strIngredient7}
                </li>
                <li>
                  {idSearch[0].strMeasure8} {idSearch[0].strIngredient8}
                </li>
                <li>
                  {idSearch[0].strMeasure9} {idSearch[0].strIngredient9}
                </li>
                <li>
                  {idSearch[0].strMeasure10} {idSearch[0].strIngredient10}
                </li>
                <li>
                  {idSearch[0].strMeasure11} {idSearch[0].strIngredient11}
                </li>
                <li>
                  {idSearch[0].strMeasure12} {idSearch[0].strIngredient12}
                </li>
              </ul>
              <h3 className="searchInstructions">
                {idSearch[0].strInstructions}
              </h3>
              <div>
                <button
                  className="searchFaveBtn"
                  onClick={(e) => {
                    addFavorite();
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
