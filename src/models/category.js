const getCategoryModel = (sequelize, { DataTypes }) => {
    const Category = sequelize.define('category', {
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        }
    },
    {
      timestamps: false
    });

    Category.associate = (models) => {
        Category.hasMany(models.Product, {foreignKey: 'category_id'});
    };

  
    return Category;
  };
  
  export default getCategoryModel;