const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 50, required: true },
    phone: { type: String, minlength: 8, maxlength: 50 },
    email: { type: String, minlength: 5, maxlength: 256, required: true },
    address: { type: String, minlength: 5, maxlength: 256 },
    logoUrl: { type: String, minlength: 5, maxlength: 1024 },
  })
);

function validateClient(client) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(50),
    email: Joi.string().min(5).max(256).required().email(),
    address: Joi.string().min(5).max(256),
    logoUrl: Joi.string().min(5).max(1024).uri(),
  });
  return schema.validate(client);
}

module.exports.Client = Client;
module.exports.validate = validateClient;
