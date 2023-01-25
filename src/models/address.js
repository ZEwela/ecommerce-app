import models from ".";

const getAddressModel = (sequelize, { DataTypes }) => {
    const Address = sequelize.define('address', {
        address_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
          },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },  
        },
        housenumber: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        },
        zipcode: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              notEmpty: true,
            },
        }, 
        country: {
            type: DataTypes.STRING, 
            allowNull: false, 
            validate: {
                notEmpty: true,
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        }
    },
    {
      timestamps: false
    });
  
    Address.associate = (models) => {
      Address.belongsToMany(models.User, { through: models.UserAddress, foreignKey: 'address_id'});

    };

  
    return Address;
  };
  
  export default getAddressModel;