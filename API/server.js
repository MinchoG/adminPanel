const express = require('express');
const Db = require('./models/Db');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3001;
const app = express();
const employeesRouter = require('./routes/employees');
const openingsRouter = require('./routes/openings');
const imagesRouter = require('./routes/images');
const aboutRouter = require('./routes/about');
const loginRouter = require('./routes/login');


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', loginRouter);
app.use('/employees', employeesRouter);
app.use('/openings', openingsRouter);
app.use('/images', imagesRouter);
app.use('/about', aboutRouter);

app.listen(port, () => {
  console.log(`Listening on :${port}`);
  Db.connection
    .sync()
    .then(() => console.log('Database connected!'))
    .catch(err => console.log('Error: ' + err));
});
