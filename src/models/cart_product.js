const getCartProductModel = (sequelize, { DataTypes }) => {
    const CartProduct= sequelize.define('cart_product', {
        cart_product_id: {
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
        cart_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'cart',
              key: 'cart_id'
            },
        }, 
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        }
    },
    {
      timestamps: false
    });
  
    CartProduct.associate = (models) => {
        CartProduct.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'product_id' });
        CartProduct.belongsTo(models.Cart, { foreignKey: 'cart_id', targetKey: 'cart_id' });
    };

  
    return CartProduct;
  };
  
  export default getCartProductModel;