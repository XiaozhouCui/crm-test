const express = require("express");
const home = require("../routes/home");
const customers = require("../routes/customers");

module.exports = function (app) {
  // built-in middleware: parse json in req and populate req.body
  app.use(express.json());
  // built-in middleware: parse web form body key1=value1&key2=value2... and populate req.body
  app.use(express.urlencoded({ extended: true }));
  // built-in middleware: give access to static assets from url (e.g. localhost:3000/readme.txt)
  app.use(express.static("public"));
  // route handlers start here
  app.use("/api/customers", customers);
  app.use("/", home);

};
