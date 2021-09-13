require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "michaelroseweir",
  password: process.env.DBPW,
  host: "localhost",
  port: 5432,
  database: "bottomsup",
});

module.exports = pool;
