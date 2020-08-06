const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Page = mongoose.model(
  "Page",
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

function validatePage(page) {
  const schema = Joi.object({
    title: Joi.string().min(3).max(256).required(),
  });
  return schema.validate(page);
}

module.exports.Page = Page;
module.exports.validate = validatePage;
