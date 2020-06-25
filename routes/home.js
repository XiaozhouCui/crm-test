const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("CRM Home");
});

module.exports = router;
