const fs = require('fs');
const jwt = require('jsonwebtoken');
const privateKEY = fs.readFileSync(__dirname + '/private.key', 'utf8');
const publicKEY = fs.readFileSync(__dirname + '/public.key', 'utf8');

// const payload = {
//   data1: 'Data 1',
//   data2: 'Data 2',
//   data3: 'Data 3',
//   data4: 'Data 4'
// };

let i = 'RTG'; // Issuer
let s = 'support@rtg.com'; // Subject
let a = 'http://luckbox.com'; // Audience
// let issued = new Date();

const signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  // iat: issued,
  expiresIn: '12h',
  algorithm: 'RS256'
};

const sign = (payload) => {
  return jwt.sign(payload, privateKEY, signOptions);
};

const verifyOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '12h',
  algorithm: ['RS256']
};

const verifyMiddleware = (req, res, next) => {
  const { token } = req.body;
  console.log(token);
  if (!token || !jwt.verify(token, publicKEY, verifyOptions)) {
    res.sendStatus(401);
    return;
  }
  console.log('VALID!!!!');
  next();
};


module.exports = { verifyMiddleware, sign };
