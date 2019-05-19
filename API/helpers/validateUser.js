const Db = require('../models/Db');

module.exports = (username, password) => {
  return Db.admin.findOne({
    where: { username, password }
  });
};

// }
