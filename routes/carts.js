const { validate } = require("../models/cart");
const { User } = require("../models/user");
const { Module } = require("../models/module");
const express = require("express");
const router = express.Router();

router.put('/update', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findById(req.body.userId).populate("cart");
  if (!user) return res.status(400).send("Invalid user ID.");
    
  user.cart = req.body.cart;

  await user.save();
  res.send(user);
});

router.post('/add', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user ID.");
  
  const item = await Module.findById(req.body.moduleId);
  if (!item) return res.status(400).send("Invalid module ID.");

  await user.addToCart(item);
  res.send(user);
});

router.post('/remove', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user ID.");

  const item = await Module.findById(req.body.moduleId);
  if (!item) return res.status(400).send("Invalid module ID.");

  await user.removeFromCart(item);
  res.send(user);
});

router.post('/clear', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user ID.");

  await user.clearCart();
  res.send(user);
});

module.exports = router;
