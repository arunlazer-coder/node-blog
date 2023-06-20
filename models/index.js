const { Sequelize, DataTypes } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DIALECT } = process.env;

const dbSetup = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect:DIALECT,
  operatorsAliases: false,
  pool: {
    max: 5,
  }
});

dbSetup
  .authenticate()
  .then(() => console.log("connected"))
  .catch((err) => console.log("Error: " + err));

const db = {};
db.Sequelize = Sequelize;
db.setup = dbSetup;

db.blog = require('./blog.js')(dbSetup, DataTypes)

db.setup.sync({ force: false });

module.exports = db