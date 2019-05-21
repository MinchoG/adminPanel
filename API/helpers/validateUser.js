const Db = require('../models/Db');

module.exports = async (username, password) => {
  return await Db.admins.findOne({
    where: { username, password }
  });
};