const { validate } = require("../models/cart");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

router.put('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const user = await User.findById(req.body.userId).populate("cart");
  if (!user) return res.status(400).send("Invalid user ID.");
    
  user.cart = req.body.cart;

  await user.save();
  res.send(user);
});

module.exports = router;
