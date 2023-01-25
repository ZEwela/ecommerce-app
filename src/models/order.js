const getOrderModel = (sequelize, { DataTypes }) => {
    const Order = sequelize.define('order', {
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false
        }
    },
    {
      timestamps: false
    });
  
    Order.associate = (models) => {
      Order.belongsToMany(models.Product, { through: models.OrderProduct, foreignKey: 'order_id'});
      Order.belongsToMany(models.Status, { through: models.OrderStatus, foreignKey: 'order_id'});
      Order.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
    };

  
    return Order;
  };
  
  export default getOrderModel;