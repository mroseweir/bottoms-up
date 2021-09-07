import React, { useState, useEffect } from "react";
import Header from "../Components/Header";
import axios from "axios";

function Random() {
  const baseURL = "https://www.thecocktaildb.com/api/json/v1/1";
  const [drink, setDrink] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${baseURL}/random.php`).then((res) => {
      setDrink(res.data.drinks);
      setLoading(false);
    });
  }, []);

  function getIt() {
    axios
      .get(`${baseURL}/random.php`)
      .then((res) => {
        let randDrink = res.data.drinks;
        setDrink(randDrink);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function addFavorite() {
    alert("Added to favorites!");
  }

  return (
    <div className="randomContainer">
      <div>
        <Header />
        <h1 className="randomHeader">find a random drink</h1>
        <button
          className="randBtn"
          onClick={(e) => {
            getIt();
          }}
        >
          Find Me A New Drink!
        </button>
        <div>
          {loading ? (
            <p>"loading"</p>
          ) : (
            <div className="randDrinkContainer">
              <div className="randDrinkPhoto">
                <img
                  src={`${drink[0].strDrinkThumb}`}
                  className="randImg"
                  alt="uh oh, img no load"
                ></img>
              </div>
              <div className="randDrinkInfo">
                <h1 className="randDrinkName">{drink[0].strDrink}</h1>

                <ul className="randIngredientsList">
                  <li>
                    {drink[0].strMeasure1} {drink[0].strIngredient1}
                  </li>
                  <li>
                    {drink[0].strMeasure2} {drink[0].strIngredient2}
                  </li>
                  <li>
                    {drink[0].strMeasure3} {drink[0].strIngredient3}
                  </li>
                  <li>
                    {drink[0].strMeasure4} {drink[0].strIngredient4}
                  </li>
                  <li>
                    {drink[0].strMeasure5} {drink[0].strIngredient5}
                  </li>
                  <li>
                    {drink[0].strMeasure6} {drink[0].strIngredient6}
                  </li>
                  <li>
                    {drink[0].strMeasure7} {drink[0].strIngredient7}
                  </li>
                  <li>
                    {drink[0].strMeasure8} {drink[0].strIngredient8}
                  </li>
                  <li>
                    {drink[0].strMeasure9} {drink[0].strIngredient9}
                  </li>
                  <li>
                    {drink[0].strMeasure10} {drink[0].strIngredient10}
                  </li>
                  <li>
                    {drink[0].strMeasure11} {drink[0].strIngredient11}
                  </li>
                  <li>
                    {drink[0].strMeasure12} {drink[0].strIngredient12}
                  </li>
                </ul>
                <h3 className="randInstructions">{drink[0].strInstructions}</h3>
                <div>
                  <button
                    className="randFaveBtn"
                    onClick={(e) => {
                      addFavorite();
                    }}
                  >
                    Add To Favorites
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Random;
