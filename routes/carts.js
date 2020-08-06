const { Cart, validate } = require("../models/cart");
const { User } = require("../models/user");
const { Module } = require("../models/module");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const carts = await Cart.find().populate("items user", "name title -_id");
  res.send(carts);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user ID.");

  if (req.body.items.length > 0) {
    const modules = await Module.find().select("_id").lean();
    const moduleIds = modules.map(item => String(item._id));
    for (id of req.body.items) {
      if (!moduleIds.includes(id)) return res.status(400).send(`Invalid module ID: ${id}`);
    }
  }

  let cart = await Cart.findOne({ user: req.body.userId });
  if (cart) return res.status(400).send("User already has a cart.");

  cart = new Cart({
    user: user._id,
    items: req.body.items,
  });
  await cart.save();
  res.send(cart);
});

router.get("/:id", async (req, res) => {
  const cart = await Cart.findById(req.params.id);
  if (!cart) return res.status(404).send("Cart not found.");
  res.send(cart);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send("Invalid user ID.");

  const cart = await Cart.findByIdAndUpdate(
    req.params.id,
    {
      items: req.body.items,
    },
    { new: true }
  );
  if (!cart) return res.status(404).send("Cart not found");
  res.send(cart);
});

router.delete("/:id", auth, async (req, res) => {
  const cart = await Cart.findByIdAndRemove(req.params.id);
  if (!cart) return res.status(404).send("The cart with the given ID was not found.");
  res.send(cart);
});

module.exports = router;
