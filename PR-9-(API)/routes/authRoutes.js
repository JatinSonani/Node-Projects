const express = require("express");

const { loginUser } = require("../controllers/AuthControllers");

const routes = express.Router();

routes.post("/login", loginUser);

module.exports = routes;
