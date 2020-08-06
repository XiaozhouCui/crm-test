const { Module, validate } = require("../models/module");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const modules = await Module.find();
  res.send(modules);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let page = await Module.findOne({ name: req.body.name });
  if (page) return res.status(400).send("Module name already exists.");

  page = new Module({
    name: req.body.name,
    title: req.body.title,
    subtitle: req.body.subtitle,
    program: req.body.program,
  });
  await page.save();
  res.send(page);
});

router.get("/:id", async (req, res) => {
  const page = await Module.findById(req.params.id);
  if (!page) return res.status(404).send("Module not found.");
  res.send(page);
});

router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const page = await Module.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      title: req.body.title,
      subtitle: req.body.subtitle,
      program: req.body.program,
    },
    { new: true }
  );
  if (!page) return res.status(404).send("Module not found");
  res.send(page);
});

router.delete("/:id", auth, async (req, res) => {
  const page = await Module.findByIdAndRemove(req.params.id);
  if (!page)
    return res.status(404).send("The Module with the given ID was not found.");
  res.send(page);
});

module.exports = router;
