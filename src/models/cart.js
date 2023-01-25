const getCartModel = (sequelize, { DataTypes }) => {
  const Cart = sequelize.define('cart', {
      cart_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true
      },
      user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: false
      },
      paid: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
  },
  {
    timestamps: false
  });

  Cart.associate = (models) => {
    Cart.belongsToMany(models.Product, { through: models.CartProduct, foreignKey: 'cart_id'});
    Cart.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
  };


  return Cart;
};

export default getCartModel;