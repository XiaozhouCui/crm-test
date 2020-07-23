// const auth = require("../middleware/auth"); // authorisation
const { User, validate } = require("../models/user");
const _ = require("lodash");
// const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

router.get("/me", async (req, res) => {
  const user = await User.findById(req.body._id).select("-password"); // exclude the hashed password
  if (!user) return res.status(404).send("User ID not found.");
  res.send(user);
});

// register a new user
router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }); // findOne(), not find by id
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  // const salt = await bcrypt.genSalt(10); // salt: 10 rounds by default
  // user.password = await bcrypt.hash(user.password, salt); // hash the password
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token) // include token in a custom header (starts with "x")
    .send(_.pick(user, ["_id", "name", "email"]));
});

module.exports = router;
