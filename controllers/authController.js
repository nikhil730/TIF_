const User = require("../Schema/userSchema");
const sendToken = require("./../utils/jwtToken");
const ErrorHandler = require("../utils/errorHandler");
const catchAsync = require("../middlewares/catchAsync");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { Snowflake } = require("@theinternetfolks/snowflake");

exports.registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(`${name}:${email}:${password}`);

  const user = await new User({
    _id: Snowflake.generate(),
    name: name,
    email: email,
    password: password,
  }).save();

  sendToken(user, 200, res);
});

exports.signin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter deatils", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // checking if password is correct
  const isPasswordMatched = await user.comparePassword(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  //console.log(res);
  sendToken(user, 200, res);
});

// API:-  /me
exports.getMyData = catchAsync(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    status: true,
    content: {
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    },
  });
});

// Extra Api for Logout
exports.logout = catchAsync(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: true,
  });
});
