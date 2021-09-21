import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import { toast } from "react-toastify";
import loadinggif from "../assets/loadinggif.gif";
import loadinggif2 from "../assets/loadinggif2.gif";
import VerifyAge from "../Components/AgeVerificationModal";

function Favorites() {
  const [favorites, setFavorites] = useState(["test"]);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);
  const [comment, setComment] = useState(true);
  const [commentBody, setCommentBody] = useState(true);
  const [drinkId2, setDrinkId2] = useState(null);
  const [commentSend, setCommentSend] = useState(null);
  const [noDrinks, setNoDrinks] = useState(true);

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
          if (drinkArr.length === 0) {
            setNoDrinks(false);
          }
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
        toast.success(`Hasta La Vista`);
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
    setDrinkId2(drinkid);
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
  }

  const onChange = (e) => {
    setCommentSend(e.target.value);
  };

  const addComment = async () => {
    let userid = parseInt(localStorage.getItem("userId"));
    let drinkid = parseInt(drinkId2);
    let comment = commentSend;

    const body = { userid, drinkid, comment };

    const response = await fetch("http://localhost:5000/comments/addcomment", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    });

    const parseRes = await response.json();

    setCommentSend("");
    setCommentBody([...commentBody, parseRes]);
  };

  function deleteComments() {
    let userid = parseInt(localStorage.getItem("userId"));
    let drinkid = parseInt(drinkId2);

    axios
      .delete(
        `http://localhost:5000/comments/deletecomments/${userid}/${drinkid}`
      )
      .then(setCommentBody(""));
  }

  function closeComment() {
    setComment(true);
  }

  return (
    <div className="favoritesContainer">
      <Header />
      <VerifyAge />
      <div>
        {comment ? null : (
          <div className="commentContainer">
            <p>What do you think?</p>
            <textarea
              type="text"
              className="commentInput"
              onChange={(e) => onChange(e)}
              value={commentSend}
            ></textarea>
            <div>
              <button className="addCommentBtn" onClick={() => addComment()}>
                Add Comment
              </button>
              <button
                className="deleteCommentBtn"
                onClick={() => deleteComments()}
              >
                Clear Comments
              </button>
            </div>
            {loading2 ? (
              <div className="currentCommentLoading">
                <img src={loadinggif2} alt="" className="loading2" />
              </div>
            ) : (
              <div className="currentComments">
                <div className="indCommentContainer">
                  <p className="indComment">{commentBody[0]}</p>
                  <p className="indComment">{commentBody[1]}</p>
                  <p className="indComment">{commentBody[2]}</p>
                  <p className="indComment">{commentBody[3]}</p>
                  <p className="indComment">{commentBody[4]}</p>
                  <p className="indComment">{commentBody[5]}</p>
                  <p className="indComment">{commentBody[6]}</p>
                  <p className="indComment">{commentBody[7]}</p>
                  <p className="indComment">{commentBody[8]}</p>
                  <p className="indComment">{commentBody[9]}</p>
                </div>
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
            {noDrinks ? (
              <p className="favoritesHeader">
                All your favorites in one place!
              </p>
            ) : (
              <p className="favoritesHeader">
                You don't have any favorites yet!
              </p>
            )}
            {/* <p className="favoritesHeader">All your favorites in one place!</p> */}
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
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure1}{" "}
                        {favorites[index].strIngredient1}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure2}{" "}
                        {favorites[index].strIngredient2}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure3}{" "}
                        {favorites[index].strIngredient3}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure4}{" "}
                        {favorites[index].strIngredient4}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure5}{" "}
                        {favorites[index].strIngredient5}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure6}{" "}
                        {favorites[index].strIngredient6}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure7}{" "}
                        {favorites[index].strIngredient7}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure8}{" "}
                        {favorites[index].strIngredient8}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure9}{" "}
                        {favorites[index].strIngredient9}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure10}{" "}
                        {favorites[index].strIngredient10}
                      </li>
                      <li key={favorites[index].id}>
                        {favorites[index].strMeasure11}{" "}
                        {favorites[index].strIngredient11}
                      </li>
                      <li key={favorites[index].id}>
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
