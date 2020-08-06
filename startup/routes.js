const express = require("express");
const home = require("../routes/home");
const clients = require("../routes/clients");
const users = require("../routes/users");
const carts = require("../routes/carts");
const login = require("../routes/login");

module.exports = function (app) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));
  // route handlers start here
  app.use("/api/clients", clients);
  app.use("/api/users", users);
  app.use("/api/carts", carts);
  app.use("/api/login", login);
  app.use("/", home);

};
