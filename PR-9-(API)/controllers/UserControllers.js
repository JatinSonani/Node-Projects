const usermodel = require("../models/UserModel");

const addUser = async (req, res) => {
  console.log(req.body);
  
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    let duplicate = await usermodel.findOne({ email: email });

    if (duplicate) {
      return res.status(409).send({
        success: false,
        message: "User already exists",
      });
    }

    const user = await usermodel.create({ name, email, password });

    return res.status(201).send({
      success: true,
      message: "User successfully added",
      user,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const viewUser = async (req, res) => {
  try {
    const users = await usermodel.find({});

    return res.status(200).send({
      success: true,
      length: users.length,
      message: "All users",
      users,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.query.id;

    const user = await usermodel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User successfully deleted",
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.query.id;
    const { name, email, password, role } = req.body;

    if (!id || !name || !email || !password || !role) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }

    const editUser = await usermodel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!editUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User successfully updated",
      editUser,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  addUser,
  viewUser,
  deleteUser,
  updateUser,
};
