const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const CartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

function validateCart(req) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().items(Joi.objectId()).required(),
  });
  return schema.validate(req);
}

module.exports.Cart = Cart;
module.exports.validate = validateCart;
