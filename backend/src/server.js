// packages
const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const prisma = require("../prisma/client");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require("node:path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const bcrypt = require("bcryptjs");

//passport config
passport.use(
  new LocalStrategy(
    { usernameField: email},
    async (email, password, done) => {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const match = await bcrypt.compare(password, user.password);

      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }),
);

// serialize the user
passport.serializeUser((user, done) => {
  // save user id inside the db
  done(null, user.id);
});

//deserialize the user
passport.deserializeUser(async (id, done) => {
  // if refresh occurs, use the id to reverify user's session from db
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    done(null, user);
  } catch (err) {
    return done(err);
  }
});

// declare server
const app = express();

// session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, // 2 minutes
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
    },
  }),
);

// initialise passport
app.use(passport.session());

//endpoint to let the web know if user is logged in or not
app.get("/api/auth/me", (req, res) => {
  if (req.isAuthenticated()) {
    return res.json({
      authenticated: true,
      user: req.user,
    });
  }

  res.json({
    authenticated: false,
  });
});

// server
app.listen(8080, (err) => {
  if (err) throw err;
  console.log("Server initialised - http://localhost:8080");
});
