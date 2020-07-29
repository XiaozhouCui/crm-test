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
    minlength: 3,
    maxlength: 255,
    unique: true, // email must be unique
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024, // for hashed password
  },
  role: {
    type: String,
    enum: ["admin", "client", "guest"],
    default: "client",
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(50).required(), // password before hash
  });
  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;