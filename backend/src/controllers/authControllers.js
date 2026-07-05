// packages
const bcrypt = require("bcryptjs");
const { body, validationResult, matchedData } = require("express-validator");

// files
const { prisma } = require("../../lib/prisma.js");

const emptyFieldErr = "is required!";
const alphaErr = "must only contain alphabetical characters!";

// Register form validation
const registerValidation = [
  body("firstname")
    .trim()
    .notEmpty()
    .withMessage("First name is required.")
    .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
    .withMessage(
      "First name can only contain letters, spaces, apostrophes and hyphens.",
    ),

  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required.")
    .matches(/^[A-Za-zÀ-ÿ\s'-]+$/)
    .withMessage(
      "Last name can only contain letters, spaces, apostrophes and hyphens.",
    ),

  body("email")
    .trim()
    .normalizeEmail()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .custom(async (email) => {
    const exists = await prisma.user.findUnique({
      where: { email },
    });
    if (exists) {
      throw new Error("An account with this e-mail address already exists!");
    }
    return true;
  }),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8 and 30 characters.")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .matches(/[^A-Za-z0-9]/)
    .withMessage("Password must contain at least one special character."),

  body("confirmPassword")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your password.")
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error("Passwords do not match.");
      }

      return true;
    }),
];
// Log in form validation

const postRegister = [
  registerValidation,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    try {
      const { firstname, lastname, email, password, confirmPassword } =
        matchedData(req);

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
        },
      });

      req.login(user, (err) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Could not log in after registration" });
        }
        const {password: _password, ...safeUser} = user;
        res.status(201).json(safeUser);
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({
        error: "Could not create user",
      });
    }
  },
];

const postLogIn = async (req, res, next) => {
  res.json({
    message: "User logged in successfully",
    user: req.user,
  });
};

const postLogOut = (req, res, next) => {
  console.log("logout from backend");
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
