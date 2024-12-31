const PostModel = require("../models/PostModel");

const CommentModel = require("../models/CommentModel");


const allPost = async (req, res) => {
  try {
    const post = await PostModel.find({}).populate("userId");

    return res.status(200).send({
      success: true,
      message: "View All Post..",
      post,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      err: error,
    });
  }
};

const allCommnet = async (req, res) => {
  try {
    const allcommnet = await CommentModel.find({})
      .populate("userId")
      .populate("postId");
    return res.status(200).send({
      success: true,
      message: "View All Comments..",
      allcommnet,
    });
  } catch (error) {
    return res.status(501).send({
      success: false,
      err: error,
    });
  }
};
module.exports = {
  allPost,
  allCommnet,
};