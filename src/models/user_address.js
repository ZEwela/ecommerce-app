const getUserAddressModel = (sequelize, { DataTypes }) => {
    const UserAddress= sequelize.define('user_address', {
        user_address_id: {
            type: DataTypes.INTEGER,
            // defaultValue: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'user',
              key: 'user_id'
            },
        },
        address_id: {
            type: DataTypes.INTEGER,
            primaryKey: false,
            references: {
              model: 'address',
              key: 'address_id'
            },
        }
    },
    {
      timestamps: false
    });
  
    UserAddress.associate = (models) => {
        UserAddress.belongsTo(models.User, { foreignKey: 'user_id', targetKey: 'user_id' });
        UserAddress.belongsTo(models.Address, { foreignKey: 'address_id', targetKey: 'address_id' });
    };

  
    return UserAddress;
  };
  
  export default getUserAddressModel;