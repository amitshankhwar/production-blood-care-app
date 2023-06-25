const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//register controller auth
const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });

    //Validaion
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "user already exist",
      });
    }
    //HASH password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashPassword;

    //rest data ko save krna h
    const user = new userModel(req.body);
    await user.save();

    return res.status(201).send({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in register API",
      error,
    });
  }
};

//login controller auth
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    //check user exitance
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //check role
    if (user.role !== req.body.role) {
      return res.status(500).send({
        success: false,
        message: "role does not match",
      });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    //check password validity
    if (!comparePassword) {
      return res.status(500).send({
        success: false,
        message: "Invaild credentials",
      });
    }

    //if sab kuch sahi rehta h then we will genrate token for login user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).send({
      success: true,
      message: "user login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in login API",
      error,
    });
  }
};

//currentuser controller
const currentUserController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    return res.status(200).send({
      success: true,
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "unable to get current user",
      error,
    });
  }
};

module.exports = { registerController, loginController, currentUserController };
