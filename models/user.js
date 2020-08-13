const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    maxlength: 256,
    unique: true, // email must be unique
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 1024, // for hashed password
  },
  role: {
    type: String,
    enum: ["admin", "coordinator", "client"],
    default: "client",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Module",
    },
  ],
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, config.get("jwtPrivateKey"));
  return token;
};

userSchema.methods.addToCart = function(item) {
  const cartItemIndex = this.cart.findIndex(itemId => {
    return itemId.toString() === item._id.toString();
  });

  const updatedCart = [...this.cart]; // clone array because .push() is a mutable method
  if (cartItemIndex < 0) updatedCart.push(item);

  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.removeFromCart = function(item) {
  const updatedCart = this.cart.filter(itemId => {
    return itemId.toString() !== item._id.toString();
  });
  this.cart = updatedCart;
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = [];
  return this.save();
};

const User = mongoose.model("User", userSchema);

// expecting a clientId in req.body from front end, as the organisation id
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(256).required().email(),
    password: Joi.string().min(4).max(50).required(), // password before hash
    clientId: Joi.objectId(),
    cart: Joi.array().items(Joi.objectId()),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
