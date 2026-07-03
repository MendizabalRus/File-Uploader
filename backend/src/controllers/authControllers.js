// packages
const bcrypt = require("bcryptjs");
const { body, validationResult, matchingData } = require("express-validator");

// files
const { prisma } = require("../../lib/prisma.js");

const emptyFieldErr = "is required!"
const alphaErr = "must only contain alphabetical characters!"

// Register form validation
registerValidation = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage(`A first name ${emptyFieldErr}`)
    .isAlpha()
    .withMessage(`First name ${alphaErr}`),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage(`A last name ${emptyFieldErr}`)
    .isAlpha()
    .withMessage(`Last name ${alphaErr}`),
  body("email")
    .trim()
    .notEmpty()
    .withMessage(`An e-mail ${emptyFieldErr}`)
    .isEmail()
    .withMessage("Introduce a valid e-mail address! For example, user@email.com"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage(`A password ${emptyFieldErr}`)
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters long!")
    .isLength({ max: 30 })
    .withMessage("Password cannot excced 30 characters!")
    .isAscii()
    .withMessage("Password can only contain letters, numbers, punctuation marks and symbols! For example, a4T,rhg$Q-x (Please, do not use the example password)"),
  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage(`Password confirmation ${emptyFieldErr}`)
    .custom((confirmPassword, { req }) => {
      const password = req.body.password;
      if (password !== confirmPassword) {
        throw new Error("Passwords do not match!")
      }
      return true;
    })
    .withMessage("Passwords do not match!")
]

// Log in form validation

const postRegister = [
  registerValidation,
  async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({
        errors: errors.array(),
      })
    }
    try {
      const { firstname, lastname, email, password, confirmPassword } = req.body;
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });
  
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
  
      res.status(500).json({
        error: "Could not create user",
      });
    }
  },

]

const postLogIn = async (req, res, next) => {
  res.json({
    message: "User logged in successfully",
    user: req.user,
  });
};

const postLogOut = (req, res, next) => {
  console.log("logout from backend")
  req.logout((err) => {
    if (err) return next(err);

    req.session.destroy((err) => {
      if (err) return next(err);

      res.clearCookie("connect.sid");

      res.json({
        message: "Logged out successfully",
      });
    });
  });
};

const getAuthMe = (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: req.user,
    });
  }

  res.json({
    authenticated: false,
  });
};

module.exports = {
  postRegister,
  postLogIn,
  postLogOut,
  getAuthMe,
};
