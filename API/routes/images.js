const express = require('express');
const imagesRouter = express.Router();

imagesRouter.use('/images', express.static('../static'));

module.exports = imagesRouter;
