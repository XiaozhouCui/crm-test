const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Module = mongoose.model(
  "Module",
  new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 256,
    },
    title: {
      type: String,
      minlength: 5,
      maxlength: 256,
    },
    subtitle: {
      type: String,
      minlength: 5,
      maxlength: 1024,
    },
    program: {
      type: String,
      minlength: 5,
      maxlength: 256,
    },
  })
);

function validateModule(mod) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(256).required(),
    title: Joi.string().min(5).max(256),
    subtitle: Joi.string().min(5).max(256),
    program: Joi.string().min(5).max(256),
  });
  return schema.validate(mod);
}

module.exports.Module = Module;
module.exports.validate = validateModule;
