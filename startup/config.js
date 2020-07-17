const config = require("config");

module.exports = function (app) {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }

  console.log("Application Name: " + config.get("name"));
  console.log("Mail Server: " + config.get("mail.host"));
  console.log(`App environment: ${app.get("env")}`);
};
