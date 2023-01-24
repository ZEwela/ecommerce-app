const getStatusModel = (sequelize, { DataTypes }) => {
    const Status = sequelize.define('status', {
        status_id: {
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
    });
  
    Status.associate = (models) => {
        Status.belongsToMany(models.Order, {through: models.OrderStatus, foreignKey: 'status_id'});
    };

  
    return Status;
  };
  
  export default getStatusModel;