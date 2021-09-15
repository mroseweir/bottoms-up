import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";

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
        // console.log(faveArr);
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
      .then(() => {
        setFavorites(drinkArr);
      })
      .finally(() => {
        // setFavorites(drinkArr);
        // console.log(drinkArr);
        setLoading(false);
        console.log(favorites);
      });
  }, []);

  if (loading) return <p>Loading</p>;

  return (
    <div className="favoritesContainer">
      <Header />
      <h1>favorites</h1>
      {favorites.map((drink, index) => (
        <div key={favorites[index].id}>
          <p>{favorites[index].strDrink}</p>
        </div>
      ))}
    </div>
  );
}

export default Favorites;

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Header from "../Components/Header";

// function Favorites() {
//   const [favorites, setFavorites] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const userId = localStorage.getItem("userId");
//     let faveArr = [];
//     let drinkArr = [];

//     axios
//       .get(`http://localhost:5000/favorite/getfavorites/${userId}`)
//       .then((res) => {
//         drinkArr = res.data;
//         // for (let i = 0; i < res.data.length; i++) {
//         //   faveArr.push(res.data[i].drinkid);
//         for (let i = 0; i < drinkArr.length; i++) {
//           // console.log(drinkArr[i]);
//           axios
//             .get(
//               `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkArr[i].drinkid}`
//             )
//             .then((res) => {
//               // let drink = res.data.drinks[0];
//               faveArr.push(res.data.drinks[0]);
//               console.log(res.data.drinks[0]);
//               // setFavorites([...favorites, res.data.drinks[0]]);
//               // console.log(drinkArr);
//               console.log(faveArr);
//             });
//         }
//       })
//       .then(() => setFavorites(faveArr))
//       .finally(() => {
//         //   console.log(faveArr);

//         setLoading(false);
//         // .then(() => setFavorites(drinkArr));
//       });
//   }, []);

//   // if (loading) return <p>Loading</p>;

//   return (
//     <div className="favoritesContainer">
//       <Header />
//       <h1>favorites</h1>
//       {loading ? (
//         <p>loading</p>
//       ) : (
//         favorites.map((drink, index) => (
//           <div key={favorites[index].id}>
//             <p>{favorites[index].strDrink}</p>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// export default Favorites;
