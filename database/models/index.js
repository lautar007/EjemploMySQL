const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config'); // Importa la configuración de Sequelize
const db = {};

const sequelize = new Sequelize('dhexample', 'root', 'mandarina', {
    host: 'localhost',
    dialect: 'mysql',
  });

// Lee todos los archivos de modelos en la carpeta actual
fs.readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Define relaciones entre modelos si es necesario
// Ejemplo: db.Usuario.hasMany(db.Pedido);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
