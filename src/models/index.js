import Sequelize from 'sequelize';

import getUserModel from './user';
import getCartModel from './cart';
import getOrderModel from './order';
import getProductModel from './product';
import getStatusModel from './status';
import getPriceModel from './price';
import getAddressModel from './address';
import getOrderProductModel from './order_product';
import getOrderStatusModel from './order_status';
import getProductPriceModel from './product_price';
import getUserAddressModel from './user_address';
import getCartProductModel from './cart_product';
import getSessionModel from './session';


const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  User: getUserModel(sequelize, Sequelize),
  Cart: getCartModel(sequelize, Sequelize),
  Order: getOrderModel(sequelize, Sequelize),
  Product: getProductModel(sequelize, Sequelize),
  Status: getStatusModel(sequelize, Sequelize),
  Price: getPriceModel(sequelize, Sequelize),
  Address: getAddressModel(sequelize, Sequelize),
  OrderProduct: getOrderProductModel(sequelize, Sequelize),
  ProductPrice: getProductPriceModel(sequelize, Sequelize),
  OrderStatus: getOrderStatusModel(sequelize, Sequelize),
  UserAddress: getUserAddressModel(sequelize, Sequelize),
  CartProduct: getCartProductModel(sequelize, Sequelize),
  Session: getSessionModel(sequelize, Sequelize),
};

Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;