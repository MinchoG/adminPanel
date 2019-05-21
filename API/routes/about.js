const express = require('express');
const aboutRouter = express.Router();
const Db = require('./../models/Db');
const jwt = require('../helpers/jwt');

aboutRouter.get('/',  async (req,res,next) => {
    try {
        const result = await Db.about.findAll();
        res.send(result);
    } catch (e) {
        res.send(e);
    } finally {
        next();
    }
});

aboutRouter.put('/:id', jwt.verifyMiddleware, async (req, res, next) => {
    try {
      delete req.body.changedData.id;
      const id = req.params.id;
  
      await Db.about
        .findByPk(id)
        .then(v => {
          v.update(req.body.changedData);
  
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

aboutRouter.delete('/:id', jwt.verifyMiddleware, async (req, res) => {
try {
    const { id } = req.params;

    Db.about.destroy({ where: { id } });
    res.sendStatus(200);
} catch (e) {
    res.send(e);
    console.log(e);
}
});

aboutRouter.post('/', jwt.verifyMiddleware, async (req, res) => {
    const { ...values } = req.body.changedData;
  
    try {
      await Db.about.create(values);
      res.sendStatus(200);
    } catch (e) {
      res.send(e);
      console.log(e);
    }
  });

module.exports = aboutRouter;


