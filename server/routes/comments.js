const router = require("express").Router();
const pool = require("../db");

router.get("/getcomments/:id/:drinkId", async (req, res) => {
  try {
    const { id, drinkId } = req.params;

    const comment = await pool.query(
      "SELECT comment FROM comments WHERE userid = $1 AND drinkid = $2",
      [id, drinkId]
    );

    res.json(comment.rows);
  } catch (err) {
    console.error(err.message);
  }
});

router.post("/addcomment", async (req, res) => {
  try {
    const { userId, drinkId, comment } = req.body;

    const newComment = await pool.query(
      "INSERT INTO comments (userid, drinkid, comment) VALUES ($1, $2, $3) RETURNING *",
      [userId, drinkId, comment]
    );

    const sendComment = newComment.rows[0].comment;

    res.json(sendComment);
  } catch (err) {
    console.error(err.message);
  }
});

module.exports = router;
