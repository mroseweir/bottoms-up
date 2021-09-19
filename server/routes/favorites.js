const router = require("express").Router();
const pool = require("../db");

router.post("/addfavorite", async (req, res) => {
  try {
    const { userId, drinkId } = req.body;

    const checkFavorite = await pool.query(
      "SELECT FROM favorites WHERE drinkid = $1 AND userid = $2",
      [drinkId, userId]
    );

    if (checkFavorite.rows.length !== 0) {
      return res.status(401).json("Already in Favorites!");
    }

    const newFavorite = await pool.query(
      "INSERT INTO favorites (userid, drinkid) VALUES ($1, $2) RETURNING *",
      [userId, drinkId]
    );

    const favDrink = newFavorite.rows[0].drinkid;

    res.status(200).json(favDrink);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/getfavorites/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const favorites = await pool.query(
      "SELECT DISTINCT drinkid FROM favorites WHERE userid = $1",
      [id]
    );

    res.json(favorites.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error!");
  }
});

router.delete("/deletefavorite/:id/:drinkId", async (req, res) => {
  try {
    const { id, drinkId } = req.params;

    const deleteFave = await pool.query(
      "DELETE FROM favorites WHERE userid = $1 AND drinkid = $2 RETURNING *",
      [id, drinkId]
    );

    const sendNewFaves = await pool.query(
      "SELECT DISTINCT drinkid FROM favorites WHERE userid = $1",
      [id]
    );

    res.json(sendNewFaves.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
