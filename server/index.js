const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

//register and login routes

app.use("/auth", require("./routes/jwtAuth"));

app.listen(4500, () => {
  console.log("Server up and running on 4500");
});
