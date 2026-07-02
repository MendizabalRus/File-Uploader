// packages
const bcrypt = require("bcryptjs");

// files
const { prisma } = require("../../lib/prisma.js");

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

const postAuthMe = (req, res) => {
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
  postAuthMe,
};
