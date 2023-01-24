const getCartModel = (sequelize, { DataTypes }) => {
    const Cart = sequelize.define('cart', {
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
          },
    });
  
    Cart.associate = (models) => {
    //   Cart.hasMany(models.Product);
    //   Cart.belongsTo(models.User);

    };

  
    return Cart;
  };
  
  export default getCartModel;