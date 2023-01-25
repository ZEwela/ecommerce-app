const getProductPriceModel = (sequelize, { DataTypes }) => {
    const ProductPrice= sequelize.define('product_price', {
        product_price_id: {
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
        price_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'price',
              key: 'price_id'
            },
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
      timestamps: false
    });
  
    ProductPrice.associate = (models) => {
        ProductPrice.belongsTo(models.Price, { foreignKey: 'price_id', targetKey: 'price_id' });
        ProductPrice.belongsTo(models.Product, { foreignKey: 'product_id', targetKey: 'product_id' });
    };

  
    return ProductPrice;
  };
  
  export default getProductPriceModel;