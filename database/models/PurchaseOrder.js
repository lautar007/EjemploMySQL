module.exports = (sequelize, DataTypes) => {
    const PurchaseOrder = sequelize.define('PurchaseOrder', {
      // Define los campos de tu modelo y sus tipos de datos
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
      }
      // Otros campos de tu modelo
    },
    {
      timestamps: true,
    });
  
    return PurchaseOrder;
  };