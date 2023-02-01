import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import models, { sequelize } from './models';
import routes from './routes';
import {createDatabase} from '../seed';
const helmet = require("helmet");
const session = require("express-session");
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const app = express();
const bcrypt = require("bcrypt");
const port = process.env.PORT;

app.use(
    session({
      secret: process.env.SESSIONSECRET,
      cookie: {
        maxAge: 172800000, 
        secure: true, 
        sameSite: "none",
        httpOnly: true,
      },
      resave: false,
      saveUninitialized: false,
      store: new SequelizeStore({
        db: sequelize,
        table: 'session'
    })
  })
);
app.use(helmet());
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
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await models.User.findByPk(id);
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
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) return done(null, false);    
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

app.get('/logout', (req, res) => {
    req.logout(function(err) {
        if(err) {
            console.log(err);
            return;
        }
    });
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
        const hash = await bcrypt.hash(password, 10);
        const newuser = await req.context.models.User.create({
            username: username, 
            password: hash,
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


// const eraseDatabaseOnSync = true;
// {force: eraseDatabaseOnSync}
sequelize.sync().then( async() => {
    // if (eraseDatabaseOnSync) {
    //     createDatabase();
    // }

    app.listen(port, () => {
        console.log(`Ecommerce app listening on port ${port}`);
    });
});

