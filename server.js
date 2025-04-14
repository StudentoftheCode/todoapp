const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Corrected import
const flash = require('express-flash');
const logger = require('morgan');
const connectDB = require('./config/database');
const mainRoutes = require('./routes/main');
const todoRoutes = require('./routes/todos');

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

// Connect to MongoDB using DB_STRING from .env file
connectDB();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger('dev'));

// Sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,  // Use the session secret from .env
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongoUrl: process.env.DB_STRING,  // Use DB_STRING from .env for the session store
      collection: 'sessions',  // Optional: Name of the collection to store session data
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use('/', mainRoutes);
app.use('/todos', todoRoutes);

app.listen(process.env.PORT, () => {
  console.log('Server is running, you better catch it!');
});