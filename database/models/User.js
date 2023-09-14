module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      // Define los campos de tu modelo y sus tipos de datos
      id_user: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false
      },
      username: {
        type: DataTypes.STRING,
          allowNull: false
      },
      password:{
        type: DataTypes.STRING,
          allowNull: false
      },
      image: {
          type: DataTypes.STRING
      }
      // Otros campos de tu modelo
    },
    {
      timestamps: false,
    });
  
    return User;
  };
  