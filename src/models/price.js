const getPriceModel = (sequelize, { DataTypes }) => {
    const Price = sequelize.define('price', {
        price_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        amount: {
          type: DataTypes.DECIMAL,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
    },
    {
      timestamps: false
    });
  
    Price.associate = (models) => {
        Price.belongsToMany(models.Product, { through: models.ProductPrice, foreignKey: 'price_id'});
    };

  
    return Price;
  };
  
  export default getPriceModel;