const express = require("express");

const routes = express.Router();

const { verifyToken } = require("../middlewares/Auth");

const { addCommnet } = require("../controllers/CommentControllers");

routes.post("/addcommnet", verifyToken, addCommnet);

module.exports = routes;
