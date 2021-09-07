const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.listen(4500, () => {
  console.log("Server up and running on 4500");
});
