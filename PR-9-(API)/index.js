const express = require("express");

const app = express();

const port = 7000;

const db = require("./config/db");

const path = require("path");

const cors = require("cors");

app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());

app.use("/", require("./routes/indexRoutes"));

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return false;
  }
  console.log(`Server is Running on port :- ${port}`);
});