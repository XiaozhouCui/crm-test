const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const Question = mongoose.model(
  "Question",
  new mongoose.Schema({
    fieldId: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 256,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 256,
    },
  })
);

function validateQuestion(question) {
  const schema = Joi.object({
    fieldId: Joi.string().min(3).max(256).required(),
    category: Joi.string().min(3).max(256).required(),
  });
  return schema.validate(question);
}

module.exports.Question = Question;
module.exports.validate = validateQuestion;
