// packages
const bcrypt = require("bcryptjs");

// files
const { prisma } = require("../../lib/prisma.js");

// Register form validation

// Log in form validation

const postRegister = async (req, res) => {
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
};

const postLogIn = async (req, res, next) => {
  res.json({
    message: "User logged in successfully",
    user: req.user,
  });
};

const postLogOut = (req, res, next) => {
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
