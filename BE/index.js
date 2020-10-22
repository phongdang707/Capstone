const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () =>
  console.log(`Hello world app listening on port ${port}!`)
);
