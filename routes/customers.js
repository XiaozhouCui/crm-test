const Joi = require("@hapi/joi");
const express = require("express");
const router = express.Router();

const customers = [
  { id: 1, name: "customer1" },
  { id: 2, name: "customer2" },
  { id: 3, name: "customer3" },
];

const validateCustomer = (customer) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
  });
  return schema.validate(customer);
};

router.get("/", (req, res) => {
  res.send(customers);
});

router.get("/:id", (req, res) => {
  const customer = customers.find((c) => {
    return c.id === parseInt(req.params.id);
  });
  if (!customer) {
    return res.status(404).send("The customer with given ID was not found");
  }
  res.send(customer);
});

router.post("/", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = {
    id: customers.length + 1,
    name: req.body.name,
  };
  customers.push(customer);
  res.send(customer);
});

router.put("/:id", (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).send("The customer with given ID was not found");

  customer.name = req.body.name;

  res.send(customer);
});

router.delete("/:id", (req, res) => {
  const customer = customers.find((c) => c.id === parseInt(req.params.id));
  if (!customer) return res.status(404).send("The customer with given ID was not found");

  const index = customers.indexOf(customer);
  customers.splice(index, 1);

  res.send(customer);
})

module.exports = router;
