const express = require("express");
const auth = express.Router();

const {
  login,
  register,
} = require("../controllers/auth");

auth.post("/login", login);

auth.post("/register", register);

module.exports = auth;
