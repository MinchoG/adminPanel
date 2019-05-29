const express = require('express');
const HttpStatusCodes = require('http-status-codes');

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
  // try {
  //   // delete req.body.changedData.id;
  //   const id = req.params.id;

  //   await Db.employees
  //     .findByPk(id)
  //     .then(employee => {
  //       employee.update(req.body);

  //       console.log('Record saved!');
  //       res.sendStatus(200);
  //     })
  //     .catch(err => {
  //       console.log('No changes were made!');
  //       res.sendStatus(409);
  //     });
  // } catch (e) {
  //   res.send(e);
  //   console.log(e);
  // }

  const id = req.params.id;

  const employee = await Db.employees.findByPk(id);
  if (!employee) {
    return res.sendStatus(HttpStatusCodes.NOT_FOUND);
  }

  if (req.body.changedData.id !== undefined) {
    delete req.body.id;
  }
  
  try {
    await employee.update(req.body.changedData);
  } catch (err) {
    return res.sendStatus(HttpStatusCodes.INTERNAL_SERVER_ERROR);
  }
  
  res.sendStatus(HttpStatusCodes.OK);
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
  console.log('values:', values, 'req.body.changedData:', req.body.changedData)
  try {
    const result = await Db.employees.create(values);
    res.sendStatus(200).send({id: result.id, name: result.name});
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

module.exports = employeeRouter;
