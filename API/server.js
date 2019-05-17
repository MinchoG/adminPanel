const express = require('express');
const db = require('./models/db');
const bodyParser = require('body-parser');
const port = 3001;
const app = express();


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// app.use(express.static('build'));
app.get('/', function(req, res) {
  res.status(200).send('OK');
});


app.listen(port, () => {
  console.log(`Listening on :${port}`);
  db.connection
    .sync()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err));
});
