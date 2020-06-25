const express = require("express");
const router = express.Router();


router.get("/api/customers", (req, res) => {
  res.send([1,2,3]);
});

router.get("/api/customers/:id", (req, res) => {
  res.send(req.params.id);
});

module.exports = router;