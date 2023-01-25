const getProductModel = (sequelize, { DataTypes }) => {
    const Product = sequelize.define('product', {
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },

    },
    {
      timestamps: false
    });
  
    Product.associate = (models) => {
        Product.belongsToMany(models.Price, { through: models.ProductPrice, foreignKey: 'product_id', onDelete: 'CASCADE'});
        Product.belongsToMany(models.Order, { through: models.OrderProduct, foreignKey: 'product_id'});
        Product.belongsToMany(models.Cart, { through: models.CartProduct, foreignKey: 'product_id'});
    };

  
    return Product;
  };
  
  export default getProductModel;