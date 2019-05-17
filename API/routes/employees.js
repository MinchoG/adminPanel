const express = require("express");
const employeeRouter = express.Router();
const Db = require("./../models/db");

employeeRouter.get("/", async (req, res, next) => {
  try {
    const result = await Db.employees.findAll();
    res.send(result);
  } catch (e) {
    res.send(e);
    console.log(e);
  } finally {
    next();
  }
});

employeeRouter.get("/", (req, res, next) => {
  res.send("just a random employeee");
  next();
});

module.exports = employeeRouter;
