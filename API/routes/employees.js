const express = require('express');
const employeeRouter = express.Router();
const Db = require('./../models/Db');
const jwt = require('../helpers/jwt');

employeeRouter.get('/', async (req, res, next) => {
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

employeeRouter.put('/:id', jwt.verifyMiddleware, async (req, res, next) => {
  try {
    delete req.body.changedData.id;
    const id = req.params.id;

    await Db.employees
      .findByPk(id)
      .then(employee => {
        employee.update(req.body.changedData);

        console.log('Record saved!');
        res.sendStatus(200);
      })
      .catch(err => {
        console.log('No changes were made!');
        res.sendStatus(409);
      });
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

employeeRouter.delete('/:id', jwt.verifyMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    Db.employees.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

employeeRouter.post('/', jwt.verifyMiddleware, async (req, res) => {
  const { ...values } = req.body.changedData;

  try {
    await Db.employees.create(values);
    res.sendStatus(200);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

module.exports = employeeRouter;
