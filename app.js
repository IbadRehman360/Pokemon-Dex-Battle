if (process.env.NODE_ENV !== "production") {
  require('dotenv').config();
}

const express = require('express');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const MongoStore = require('connect-mongo')
const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoSanitize = require('express-mongo-sanitize');
const flash = require('connect-flash');
const mongoose = require('mongoose')

const User = require('./models/User');
const authRoutes = require('./routes/Auth');
const pokeRoutes = require('./routes/pokeRoutes');
const mongooseConnection = require('./models/database'); 

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/pokemon';

mongooseConnection(dbUrl)
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const imageFolder = path.join(__dirname, 'images');
app.use('/images', express.static(imageFolder));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.use(mongoSanitize({ replaceWith: '_' }));




const secret = process.env.SECRET || 'thisshouldbeabettersecret!';

const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60,
  crypto: {
      secret,
  }
});

const sessionConfig = {
  store,
  name: 'session',
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
} 

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(flash());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use('/pokemon', pokeRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
  res.render('Pokemon/index.ejs');
});

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
