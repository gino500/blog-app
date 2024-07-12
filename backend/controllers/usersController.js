const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const utils = require("../lib/utils");
const { validationResult } = require("express-validator");

// Models
const User = require("../models/users");

exports.user_list_get = asyncHandler(async (req, res, next) => {
  const users = await User.find({}, "user").sort({ user: 1 });

  res.json({ users });
});

exports.user_detail_get = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.json({ _id: user._id, user: user.user });
});

exports.user_login_post = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422).json({ errors: errors.array() });
    return;
  }

  const validPassword = await User.findOne({ user: req.body.user }).select(
    "password"
  );

  const user = await User.findOne({ user: req.body.user }).select("_id user");

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "User not found",
    });
  }
  const match = await bcrypt.compare(req.body.password, validPassword.password);
  if (match) {
    const jwt = utils.issueJWT(res, user);
    return res.status(200).json({
      user: user,
      token: jwt.token,
      expiresIn: jwt.expiresIn,
    });
  }
  if (!match) {
    return res.status(401).json({
      success: false,
      message: "Incorrect password",
    });
  }
});

exports.user_logout_post = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

exports.user_create_post = asyncHandler(async (req, res, next) => {
  try {
    const user = new User({
      user: req.body.user,
      password: req.body.password,
      email: req.body.email,
      admin: "false",
    });
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return;
    }
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) return err;
      else {
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({
          message: "Success: User Created",
          user: {
            id: user._id,
            user: user.user,
          },
        });
      }
    });
  } catch (err) {
    res.json({
      message: err,
    });
    return next(err);
  }
});
