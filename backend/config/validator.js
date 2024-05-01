const { body } = require("express-validator");
const User = require("../models/users");

userCreateValidator = [
  body("user")
    .custom(async user => {
      const duplicate = await User.findOne({ user: user });
      if (duplicate) {
        throw new Error("username already exists!");
      }
      return true;
  }),
  body("user")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("username field empty!")
    .isLength({ min: 2 })
    .withMessage("username minimum 2 characters! ")
    .bail(),
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("password field empty!")
    .isLength({ min: 8 })
    .withMessage("password minimum 8 characters! ")
    .bail(),
  body("email")
    .isEmail()
    .notEmpty()
    .withMessage("email field empty!")
    .bail(),
];

userLoginValidator = [
  body("user")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("username field empty!")
    .bail(),
  body("password")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("password field empty!")
    .bail(),
];

blogCreateValidator = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .bail()
    .escape()
    .withMessage("title must be minimum 5 characters!"),
  body("text")
    .notEmpty()
    .trim()
    .bail()
    .isLength({ min: 30 })
    .withMessage("blog must be minimum 30 characters!")
    .bail(),
];

commentCreateValidator = [
  body("text")
    .notEmpty()
    .trim()
    .bail()
    .isLength({ min: 1 })
    .withMessage("comment minimum 1 character! ")
    .bail(),
];

module.exports = {
  userCreateValidator,
  userLoginValidator,
  blogCreateValidator,
  commentCreateValidator,
};
