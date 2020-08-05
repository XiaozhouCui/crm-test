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
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client"
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: this.role }, config.get("jwtPrivateKey"));
  return token;
};

const User = mongoose.model("User", userSchema);

// expecting a clientId in req.body from client side, as the organisation id
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(256).required().email(),
    password: Joi.string().min(4).max(50).required(), // password before hash
    clientId: Joi.objectId(),
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
