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
        itemId: String,
        // itemId: {
        //   type: Schema.Types.ObjectId,
        //   ref: 'Page',
        // },
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

function validateCart(cart) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    items: Joi.array().required(),
    itemId: Joi.string().min(3).max(256),
  });
  return schema.validate(cart);
}

module.exports.Cart = Cart;
module.exports.validate = validateCart;
