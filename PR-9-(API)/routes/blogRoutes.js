const express = require("express");

const routes = express.Router();

const {
  addPost,
  viewPost,
  deleteBlog,
  updateBlog,
} = require("../controllers/BlogControllers");

const { verifyToken } = require("../middlewares/Auth");

// file upload
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, "../uploads")); // Save files in the "uploads" folder
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, `${file.fieldname}-${uniqueSuffix}`);
    },
  });
  
  const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error("Only image files are allowed!"), false);
      }
    },
  }).single("image");

// routes

routes.post("/addblog", verifyToken, upload, addPost);
routes.get("/viewblog", verifyToken, viewPost);
routes.delete("/deleteblog", verifyToken, deleteBlog);
routes.put("/updateblog", verifyToken, updateBlog);

module.exports = routes;
