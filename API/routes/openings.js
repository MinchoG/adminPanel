const express = require('express');
const openingsRouter = express.Router();
const Db = require('./../models/Db');
const jwt = require('');

openingsRouter.get('/', async (req, res) => {
  try {
    const result = await Db.openings.findAll();
    res.send(result);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

openingsRouter.put('/:id', verifyMiddleware, async (req, res) => {
  try {
    delete req.body.changedData.id;
    const id = req.params.id;

    const [affectedCount] = await Db.openings.update(req.body.changedData, {
      where: { id }
    });
    console.log('affectedCount:', affectedCount);
    if (affectedCount) {
      console.log('Record saved!');
      res.sendStatus(200);
    } else {
      console.log('No changes were made!');
      res.sendStatus(409);
    }
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

openingsRouter.delete('/:id', verifyMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    Db.openings.destroy({ where: { id } });
    res.sendStatus(200);
  } catch (e) {
    res.send(e);
    console.log(e);
  }
});

openingsRouter.post('/', verifyMiddleware, async (req, res) => {
  const { ...values } = req.body.changedData;

  try {
    await Db.openings.create(values);
    res.sendStatus(200);
    res.end();
  } catch (e) {
    res.send(e);
    console.log(e);
    res.end();
  }
});

module.exports = openingsRouter;
