const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    items: [
      {
        itemId: {
          type: Schema.Types.ObjectId,
          ref: 'Page',
        }
      }
    ],
    active: {
      type: Boolean,
      default: true
    },
    modifiedOn: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

module.exports.Cart = Cart;
