const { Client, validate } = require("../models/client");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const clients = await Client.find().sort("name");
  res.send(clients);
});

router.get("/:id", async (req, res) => {
  const clients = await Client.findById(req.params.id);
  if (!clients) return res.status(404).send("The client with given ID was not found");
  res.send(clients);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let client = await Client.findOne({ name: req.body.name });
  if (client) return res.status(400).send("This orgnisation name is already used, please use another one.");

  client = new Client({
    name: req.body.name,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    logoUrl: req.body.logoUrl,
  });
  await client.save();
  res.send(client);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const client = await Client.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      logoUrl: req.body.logoUrl,
    },
    { new: true }
  );
  if (!client) return res.status(404).send("The client with given ID was not found");
  res.send(client);
});

router.delete("/:id", async (req, res) => {
  const client = await Client.findByIdAndRemove(req.params.id);
  if (!client) return res.status(404).send("The client with given ID was not found");
  res.send(client);
})

module.exports = router;
