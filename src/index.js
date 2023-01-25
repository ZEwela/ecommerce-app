import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models';
import routes from './routes';
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();

const port = process.env.PORT;

app.use(
    session({
      secret: process.env.SESSIONSECRET,
      cookie: {maxAge: 172800000, secure: true, sameSite: "none"},
      resave: false,
      saveUninitialized: false,
      store: new SequelizeStore({
        db: sequelize,
        table: 'session'
      })
    })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next ) => {
    req.context = {
        models,
        sequelize
    }
    next();
});

app.use('/carts', routes.cart);
app.use('/orders', routes.order);
app.use('/users', routes.user);
app.use('/products', routes.product);

// you can use it as middleware to protected pages - user profile, maybe admin?
function ensureAuthentication(req, res, next) {
    if (req.session.authenticated) {
      return next();
    } else {
      res.status(403).json({ msg: "You're not authorized to view this page" });
    }
  }

app.get('/login', (req, res) => {
    console.log('Tu w koncu bedzie render do view logowania')
});

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await req.context.models.User.findOne({ where: {username: username} });
        if (!user) return res.status(403).json({ msg: "No user found!" });
        if (user.password === password) {
            req.session.authenticated = true;
            req.session.user = {
                username,
                password,
            }
            console.log(req.session);
            res.redirect('/products');
        } else {
            res.status(403).json({ msg: "Bad Credentials" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error occured" });
    };
});



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
    await models.Product.create(
        {
            name: 'penicl',
            price_id: 3
        }
    ),
    await models.Product.create(
        {
            name: 'scissors',
            price_id: 4
        }
    )
    await models.Price.create(
        {
            amount: 2.0
        }
    ),
    await models.Price.create(
        {
            amount: 4.55
        }
    ),
    await models.Price.create(
        {
            amount: 6.0
        }
    ),
    await models.Price.create(
        {
            amount: 5.4
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
            price_id: 3,
            product_id: 1,
            created_at: '2022-03-23'
        }
    ),
    await models.ProductPrice.create(
        {
            price_id: 3,
            product_id: 4,
            created_at: '2021-03-23'
        }
    ),
    await models.ProductPrice.create(
        {
            price_id: 2,
            product_id: 2,
            created_at: '2020-03-23'
        }
    ),
    await models.ProductPrice.create(
        {
            price_id: 4,
            product_id: 3,
            created_at: '2022-03-23'
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