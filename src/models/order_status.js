const getOrderStatusModel = (sequelize, { DataTypes }) => {
    const OrderStatus= sequelize.define('order_status', {
        order_status_id: {
            type: DataTypes.INTEGER,
            // defaultValue: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'order',
              key: 'order_id'
            },
        },
        status_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'status',
              key: 'status_id'
            },
        }
    },
    {
      timestamps: false
    });
  
    OrderStatus.associate = (models) => {
        OrderStatus.belongsTo(models.Order, { foreignKey: 'order_id', targetKey: 'order_id' });
        OrderStatus.belongsTo(models.Status, { foreignKey: 'status_id', targetKey: 'status_id' });
    };

  
    return OrderStatus;
  };
  
  export default getOrderStatusModel;