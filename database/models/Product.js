module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    // Define los campos de tu modelo y sus tipos de datos
    id_product: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
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

  return Product;
};
