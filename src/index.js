import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models';
import routes from './routes';

const app = express();

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next ) => {
    req.context = {
        models,
    }
    next();
});

app.use('/carts', routes.cart);
app.use('/orders', routes.order);
app.use('/users', routes.user);
app.use('/products', routes.product);

const eraseDatabaseOnSync = true;

sequelize.sync({force: eraseDatabaseOnSync}).then( async() => {
    if (eraseDatabaseOnSync) {
        createDatabase();
    }

    app.listen(port, () => {
        console.log(`Ecommerce app listening on port ${port}`);
    });
});

const createDatabase = async() => {
    await models.User.create(
        {
          username: 'ezawol',
          email: 'ezawol@gmail.com',
          password: 'password',
          created_at: '2020-01-12'
        },
    ),
    await models.User.create(
        {
          username: 'karolo',
          email: 'karolo@gmail.com',
          password: 'pssdaaae',
          created_at: '2021-07-22'
        },
    ),
    await models.Product.create(
        {
            name: 'pen',
            price_id: 2
        }
    ),
    await models.Product.create(
        {
            name: 'notebook',
            price_id: 1
        }
    ),
    await models.Price.create(
        {
            amount: 2.0
        }
    ),
    await models.Price.create(
        {
            amount: 4.5
        }
    ),

    await models.Address.create(
        {
            street: 'Powolona',
            city: 'Holo',
            housenumber: 3,
            zipcode: 'wd-343',
            country: 'Polnd',
            title: 'home'
        }
    ),
    await models.Address.create(
        {
            street: 'Trowloo',
            city: 'Kalo',
            housenumber: 32,
            zipcode: 'zz-767',
            country: 'Zimbabwe',
            title: 'work'
        }
    ),
    await models.UserAddress.create(
        {
            user_id: 1,
            address_id: 1
        }
    ),
    await models.UserAddress.create(
        {
            user_id: 2,
            address_id: 1
        }
    ),
    await models.ProductPrice.create(
        {
            price_id: 1,
            product_id: 1,
            created_at: '2020-03-23'
        }
    ),
    await models.ProductPrice.create(
        {
            price_id: 2,
            product_id: 2,
            created_at: '2020-03-23'
        }
    ),
    await models.Status.create(
        {
            title: 'canceled'
        }
    ),
    await models.Status.create(
        {
            title: 'pending'
        }
    ),
    await models.Status.create(
        {
            title: 'complited'
        }
    ),
    await models.ProductPrice.create(
        {
            product_id: 2,
            price_id: 1,
            created_at: '2022-03-23'
        }
    ),
    await models.Order.create(
        {
 
            user_id: 2
        }
    ),
    await models.Order.create(
        {
 
            user_id: 1
        }
    ),
    await models.OrderProduct.create(
        {
           order_id: 1,
           product_id: 1, 
           quantity: 3 
        }
    ),
    await models.OrderProduct.create(
        {
           order_id: 1,
           product_id: 2, 
           quantity: 5 
        }
    ),
    await models.OrderProduct.create(
        {
           order_id: 2,
           product_id: 2, 
           quantity: 10 
        }
    ),
    await models.OrderStatus.create(
        {
            order_id: 1,
            status_id: 2
        }
    ),
    await models.OrderStatus.create(
        {
            order_id: 2,
            status_id: 1
        }
    ),
    await models.Cart.create(
        {
            user_id: 1,
            paid: false
        }
    ),
    await models.CartProduct.create(
        {
            cart_id: 1,
            product_id: 2,
            quantity: 30
        }
    )
};