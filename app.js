const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
// Passport Config
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').mongoUrl;

// connect to mongo
mongoose.connect(db, { useNewUrlParser: true})
.then(() => console.log('Mongodb server connected....'))
.catch(err => console.log(err));

// EJS middleware
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, './public')));

// body-parser
app.use(express.urlencoded({ extended: false }));

// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// routes middleware
const router = require('./routes/index');
const userRouter = require('./routes/users');

app.use('/', router);
app.use('/users', userRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server run at port ${port}`));