const db = require('../models/db');

module.exports = (username, password) => {
  return db.admin.findOne({
    where: { username, password }
  });
};

// }
