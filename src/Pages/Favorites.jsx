import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import loadinggif from "../assets/loadinggif.gif";

function Favorites() {
  const [favorites, setFavorites] = useState(["test"]);
  const [loading, setLoading] = useState(true);

  let drinkArr = [];

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:5000/favorite/getfavorites/${userId}`)
      .then((res) => {
        let faveArr = [];
        for (let i = 0; i < res.data.length; i++) {
          faveArr.push(res.data[i].drinkid);
        }
        for (let i = 0; i < faveArr.length; i++) {
          axios
            .get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${faveArr[i]}`
            )
            .then((res) => {
              drinkArr.push(res.data.drinks[0]);
            });
        }
      })
      .finally(() => {
        setFavorites(drinkArr);
        setTimeout(() => {
          setLoading(false);
        }, 1700);
      });
  }, []);

  function deleteIt(drinkId) {
    setLoading(true);
    const userId = localStorage.getItem("userId");

    axios
      .delete(
        `http://localhost:5000/favorite/deletefavorite/${userId}/${drinkId}`
      )
      .then((res) => {
        let faveArr = [];
        for (let i = 0; i < res.data.length; i++) {
          faveArr.push(res.data[i].drinkid);
        }
        let drinkArr = [];
        for (let i = 0; i < faveArr.length; i++) {
          axios
            .get(
              `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${faveArr[i]}`
            )
            .then((res) => {
              drinkArr.push(res.data.drinks[0]);
            });
        }
        setFavorites(drinkArr);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }

  return (
    <div className="favoritesContainer">
      <Header />
      <div>
        {loading ? (
          <div>
            <p className="loadingHeader">Hang Tight!</p>
            <img src={loadinggif} alt="" className="loading" />
          </div>
        ) : (
          <div>
            <h1 className="favoritesHeader">
              All your favorites in one place!
            </h1>
            {favorites.map((drink, index) => (
              <div key={favorites[index].id} className="indFaveContainer">
                <div className="indFaveHeaderContainer">
                  <p className="indFaveHeader">{favorites[index].strDrink}</p>
                </div>
                <div className="indFaveInfo">
                  <img
                    src={`${favorites[index].strDrinkThumb}`}
                    className="faveImg"
                    alt="uh oh, gif no load"
                  ></img>
                  <div>
                    <ul className="faveIngredientsList">
                      <li>
                        {favorites[index].strMeasure1}{" "}
                        {favorites[index].strIngredient1}
                      </li>
                      <li>
                        {favorites[index].strMeasure2}{" "}
                        {favorites[index].strIngredient2}
                      </li>
                      <li>
                        {favorites[index].strMeasure3}{" "}
                        {favorites[index].strIngredient3}
                      </li>
                      <li>
                        {favorites[index].strMeasure4}{" "}
                        {favorites[index].strIngredient4}
                      </li>
                      <li>
                        {favorites[index].strMeasure5}{" "}
                        {favorites[index].strIngredient5}
                      </li>
                      <li>
                        {favorites[index].strMeasure6}{" "}
                        {favorites[index].strIngredient6}
                      </li>
                      <li>
                        {favorites[index].strMeasure7}{" "}
                        {favorites[index].strIngredient7}
                      </li>
                      <li>
                        {favorites[index].strMeasure8}{" "}
                        {favorites[index].strIngredient8}
                      </li>
                      <li>
                        {favorites[index].strMeasure9}{" "}
                        {favorites[index].strIngredient9}
                      </li>
                      <li>
                        {favorites[index].strMeasure10}{" "}
                        {favorites[index].strIngredient10}
                      </li>
                      <li>
                        {favorites[index].strMeasure11}{" "}
                        {favorites[index].strIngredient11}
                      </li>
                      <li>
                        {favorites[index].strMeasure12}{" "}
                        {favorites[index].strIngredient12}
                      </li>
                    </ul>
                    <h3 className="indFaveInstructions">
                      {favorites[index].strInstructions}
                    </h3>
                    <button
                      className="faveDeleteBtn"
                      data-drinkid={favorites[index].idDrink}
                      onClick={(e) => {
                        deleteIt(e.target.dataset.drinkid);
                      }}
                    >
                      Delete from favorites
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
