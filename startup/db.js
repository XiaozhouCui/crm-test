const mongoose = require("mongoose");

module.exports = function () {
  const db = "mongodb://localhost/crm";
  mongoose
    .connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB...", err));
};
