const jwt = require("jsonwebtoken");

const usermodel = require("../models/UserModel");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(501).send({
        success: false,
        message: "All Fields Are Required...",
      });
    }

    const user = await usermodel.findOne({ email: email });

    if (!user || user.password != password) {
      return res.status(501).send({
        success: false,
        message: "Invalid Email Or Password...",
      });
    }

    const token = await jwt.sign({ payload: user }, "admin", {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "Login Sucessfully...",
      token: token,
    });
  } catch (error) {
    return res.status(401).send({
      success: false,
      err: error,
    });
  }
};

module.exports = {
  loginUser,
};
