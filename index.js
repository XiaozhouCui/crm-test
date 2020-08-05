const express = require("express");
const app = express();

require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")(app);
require("./startup/validation")();

const port = process.env.PORT || 3900;
const server = app.listen(port, () => console.log(`Listening to port ${port}...`));

module.exports = server;
