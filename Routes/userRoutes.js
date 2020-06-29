const express = require("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport/passport");
const JWT = require("jsonwebtoken");
const User = require("../Models/Users");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "ParkerPizza",
      sub: userID,
    },
    "ParkerPizza",
    { expireIn: "1h" }
  );
};

userRouter.post("/register", (req, res) => {
  const { username, password, email } = req.body;
  User.findOne({ username }, (err, user) => {
    if (err)
      res
        .status(500)
        .json({ message: { msgBody: "Error has occured", msgError: true } });
    if (user)
      res
        .status(500)
        .json({ message: { msgBody: "User already exist", msgError: true } });
    else {
      const newUser = new User({ user, passport, email });
      newUser.save((err) => {
        if (err)
          res.status(500).json({
            message: { msgBody: "Email already exist", msgError: true },
          });
        else
          res
            .status(201)
            .json({ message: { msgBody: "User Created!", msgError: false } });
      });
    }
  });
});

userRouter.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.cookie("userID", _id, { httpOnly: true, sameSite: true });
      res
        .status(200)
        .json({ isAuthenticated: true, user: { username, _id, role } });
    }
  }
);
userRouter.get("/all", (req, res) => {
  User.find().then((results) => {
    res.json(results);
  });
});

userRouter.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.clearCookie("userID");
    res.json({ user: { username: "", role: "" }, success: true });
  }
);

userRouter.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username } });
  }
);

module.exports = userRouter;
