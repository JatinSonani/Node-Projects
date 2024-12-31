const PostModels = require("../models/BlogModel");

const commnetmodels = require("../models/CommentModel");

const addCommnet = async (req, res) => {
  try {
    const postid = req.query.id;
    const post = await PostModels.findOne({ _id: postid });
    if (post) {
      const { commnet } = req.body;
      const comment = await commnetmodels.create({
        userId: req.user._id,
        postId: postid,
        comment: commnet,
      });
      return res.status(200).send({
        success: true,
        messsge: "Comment Added Sucessfully",
        comment,
      });
    } else {
      return res.status(501).send({
        success: false,
        messsge: "Post Not Found",
      });
    }
  } catch (error) {
    return res.status(501).send({
      success: false,
      err: error,
    });
  }
};

module.exports = {
  addCommnet,
};
