const getUserModel = (sequelize, { DataTypes }) => {
    const User = sequelize.define('user', {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true,
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
  
    User.associate = (models) => {
      User.hasMany(models.Order, { onDelete: 'CASCADE',foreignKey: 'user_id', targetKey: 'user_id' });
      User.hasOne(models.Cart, { onDelete: 'CASCADE',foreignKey: 'user_id', targetKey: 'user_id' });
      User.belongsToMany(models.Address, { through: models.UserAddress, foreignKey: 'user_id'});

    };

  
    return User;
  };
  
  export default getUserModel;