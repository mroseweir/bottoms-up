import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { toast } from "react-toastify";
import loadinggif from "../assets/loadinggif.gif";
import loadinggif2 from "../assets/loadinggif2.gif";

function Favorites() {
  const [favorites, setFavorites] = useState(["test"]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [comment, setComment] = useState(true);
  const [commentBody, setCommentBody] = useState(true);

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
    // console.log(drinkName);
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
        toast.success(`Hasta La Vista, baby`);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  }

  let commentArr = [];

  function commentFire(drinkid) {
    setComment(false);
    setCommentBody(null);
    setLoading2(true);
    commentArr = [];
    const userId = localStorage.getItem("userId");

    axios
      .get(`http://localhost:5000/comments/getcomments/${userId}/${drinkid}`)
      .then((res) => {
        for (let i = 0; i < res.data.length; i++) {
          commentArr.push(res.data[i].comment);
        }
      })
      .finally(() => {
        setTimeout(() => {
          setCommentBody(commentArr);
          setLoading2(false);
        }, 1000);
      });

    console.log(drinkid);
    console.log(userId);
  }

  function closeComment() {
    setComment(true);
  }

  return (
    <div className="favoritesContainer">
      <Header />
      <div>
        {comment ? null : (
          <div className="commentContainer">
            <p>What do you think?</p>
            <textarea type="text" className="commentInput"></textarea>
            <div>
              <button className="addCommentBtn">Add Comment</button>
            </div>
            {loading2 ? (
              <div className="currentCommentLoading">
                <img src={loadinggif2} alt="" className="loading2" />
              </div>
            ) : (
              <div className="currentComments">
                <p>{commentBody[0]}</p>
                <p>{commentBody[1]}</p>
                <p>{commentBody[2]}</p>
                <p>{commentBody[3]}</p>
                <p>{commentBody[4]}</p>
                <p>{commentBody[5]}</p>
                <p>{commentBody[6]}</p>
                <p>{commentBody[7]}</p>
                <p>{commentBody[8]}</p>
                <p>{commentBody[9]}</p>
                <p>{commentBody[10]}</p>
              </div>
            )}
            <div>
              <button
                className="closeCommentBtn"
                onClick={() => closeComment()}
              >
                close comments
              </button>
            </div>
          </div>
        )}
      </div>
      <div>
        {loading ? (
          <div>
            <p className="loadingHeader">Hang Tight!</p>
            <img src={loadinggif} alt="" className="loading" />
          </div>
        ) : (
          <div>
            <p className="favoritesHeader">All your favorites in one place!</p>
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
                    <div className="faveDeleteBtnContainer">
                      <button
                        className="faveDeleteBtn"
                        data-drinkid={favorites[index].idDrink}
                        onClick={(e) => commentFire(e.target.dataset.drinkid)}
                      >
                        comments
                      </button>
                      <button
                        className="faveDeleteBtn"
                        data-drinkid={favorites[index].idDrink}
                        onClick={(e) => {
                          deleteIt(e.target.dataset.drinkid);
                        }}
                      >
                        delete
                      </button>
                    </div>
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
