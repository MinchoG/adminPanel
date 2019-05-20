const express = require('express');
const imagesRouter = express.Router();

imagesRouter.use('/', express.static('static'));
imagesRouter.use(express.static(__dirname + "/public")) //Maybe?

module.exports = imagesRouter;
