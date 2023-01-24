const getOrderProductModel = (sequelize, { DataTypes }) => {
    const OrderProduct= sequelize.define('order_product', {
        order_product_id: {
            type: DataTypes.INTEGER,
            // defaultValue: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'product',
              key: 'product_id'
            },
        },
        order_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'order',
              key: 'order_id'
            },
        }, 
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        }
    });
  
    OrderProduct.associate = (models) => {
        OrderProduct.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'product_id' });
        OrderProduct.belongsTo(models.Order, { foreignKey: 'order_id', targetKey: 'order_id' });
    };

  
    return OrderProduct;
  };
  
  export default getOrderProductModel;