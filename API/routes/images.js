const express = require('express');
const multer = require('multer');
const uuidv4 = require('uuid/v4');
const imagesRouter = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'static/');
    },
    filename: function(req, file, cb) {
      cb(null, uuidv4() + `.${file.originalname.split('.').pop()}`);
    }
  });
const upload = multer({ storage });

imagesRouter.post('/', upload.single('image'), (req, res, next) => {
    try {
      console.log('FOOO BARE', req.file.image);
      // console.log('REQ FILE:',req.file,'REQ FILENAME:', req.file.filename)
      res.send(req.file.image);
      res.end();
    } catch (e) {
      console.log(e);
    }
  });

imagesRouter.use('/', express.static('static'));


module.exports = imagesRouter;
