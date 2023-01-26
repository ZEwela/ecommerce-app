import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models';
import routes from './routes';
import { DATE } from 'sequelize';
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

app.use(passport.initialize());
app.use(passport.session());
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

passport.serializeUser((user, done) => {
    console.log(user);
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await req.context.models.User.findByPk(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await models.User.findOne({ where: {username: username} });
            if (!user) return done(null, false);
            if (user.password != password) return done(null, false);
            return done(null, user);
        } catch (err) {
            return done(err);
        } 
    }
));

app.use('/carts', routes.cart);
app.use('/orders', routes.order);
app.use('/users', routes.user);
app.use('/products', routes.product);

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    console.log('Tu w koncu bedzie render do view logowania')
});

app.get('/profile', (req, res) => {
    console.log(`u w koncu bedzie render do view profilu albo czegos innego i pass user object stored in session, res.render("profile", {user: req.user});`)
});

app.post('/login', passport.authenticate('local', {failureRedirect: '/login'}),
    (req, res) => {
      res.redirect("profile");
    }
);

app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    
    try {
      const newuser = await req.context.models.User.create({
        username: username, 
        password: password,
        email: email,
        created_at: new Date()
      });
      res.status(201).json({
        msg: 'User created',
        newuser
      });
    } catch (error) {
      res.status(500).json({
        msg: 'User wasnt created',
        error
      });
    }
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