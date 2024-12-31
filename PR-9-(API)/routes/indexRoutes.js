const express = require("express");

const routes = express.Router();

routes.use("/", require("./userRoutes"));
routes.use("/auth", require("./authRoutes"));
routes.use("/post", require("./blogRoutes"));
routes.use("/admin", require("./adminRoutes"));
routes.use("/comment", require("./commentRoutes"));

module.exports = routes;
