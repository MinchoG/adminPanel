const Sequelize = require('sequelize');
const connection = new Sequelize('ACME-SENIOR', 'root', '123test123', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const employees = connection.define(
  'employees',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING
    },
    big: {
      type: Sequelize.BOOLEAN
    }
  },
  { timestamps: false }
);

const openings = connection.define(
  'openings',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    }
  },
  { timestamps: false }
);

const admins = connection.define(
  'admin',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  },
  { timestamps: false }
);

module.exports = { employees, openings, admins, connection };
