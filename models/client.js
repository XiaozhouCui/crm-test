const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Client = mongoose.model(
  "Client",
  new mongoose.Schema({
    name: { type: String, minlength: 3, maxlength: 50, required: true },
    phone: { type: String, minlength: 8, maxlength: 50, required: true },
  })
);

function validateClient(client) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(8).max(50).required(),
  });
  return schema.validate(client);
}

module.exports.Client = Client;
module.exports.validate = validateClient;
