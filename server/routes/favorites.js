const router = require("express").Router();
const pool = require("../db");

router.post("/addfavorite", async (req, res) => {
  try {
    const { userId, drinkId } = req.body;

    const newFavorite = await pool.query(
      "INSERT INTO favorites (userid, drinkid) VALUES ($1, $2) RETURNING *",
      [userId, drinkId]
    );

    const favDrink = newFavorite.rows[0].drinkid;

    res.json(favDrink);
  } catch (err) {
    console.log("fail");
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

router.get("/getfavorites", async (req, res) => {
  try {
    const userId = req.body.userId;

    console.log(userId);

    const favorites = await pool.query(
      "SELECT drinkid FROM favorites WHERE userid = $1",
      [userId]
    );

    res.json(favorites.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
