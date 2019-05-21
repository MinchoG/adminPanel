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
  { timestamps: false,
    freezeTableName: true, }
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
  { timestamps: false,
    freezeTableName: true, }
);

const admins = connection.define(
  'admins',
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
  { 
    timestamps: false,
    freezeTableName: true, 
  }
);

const about = connection.define(
  'about',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    description: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
  },
  { 
    timestamps: false,
    freezeTableName: true,
  }
);


module.exports = { employees, openings, admins, about, connection };
