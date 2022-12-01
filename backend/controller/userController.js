const User = require("../models/UserModel");
const sendToken = require("../utils/sendToken");
const ErrorHandler = require("../utils/ErrorHandler");
const jwt = require("jsonwebtoken");
exports.registerUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
  // try {
  //   const user = await User.create(req.body);
  //   const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  //   res.status(200).json({ success: true, token });
  // } catch (error) {
  //   return next(new ErrorHandler("Error occured while creating the user", 404));
  // }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Email and password is required", 500));
  }
  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("User not found.", 404));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Email or password is not valid!", 200));
    }
    sendToken(user, 200, res);
  } catch (error) {}
};

exports.logOut = async (req, res, next) => {
  res.cookie("token", null, {
    expiresIn: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};
