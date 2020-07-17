const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")(app);

// const customerSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
// });

// const Customer = mongoose.model("Customer", customerSchema);

// async function createCustomer() {
//   const customer = new Customer({
//     name: "John Doe",
//     phone: "123456789",
//   });
//   const result = await customer.save();
//   console.log(result);
// }

// createCustomer();



const port = process.env.PORT || 3000;
const server = app.listen(port, () => console.log(`Listening to port ${port}...`));

module.exports = server;
