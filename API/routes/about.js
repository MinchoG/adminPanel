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

module.exports = aboutRouter;


