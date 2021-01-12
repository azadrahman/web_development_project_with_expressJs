const express = require('express');
const bcrypt = require('bcryptjs');
const userRouter = express.Router();
const passport = require('passport');

// user model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// login page
userRouter.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login');
});
userRouter.get('/register', (req, res) => {
    res.render('register');
});

// register handle
userRouter.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];

    // check required fields
    if( !name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }
    // check password match
    if( password !== password2 ) {
        errors.push({ msg: 'Passwords do not match' });
    }
    // check password length
    if( password.length < 6 ) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if( errors.length > 0 ) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    }
    else {
        User.findOne({ email: email})
        .then((user) => {
            // user exists
            if(user) {
                errors.push({ msg: 'Email already exists' });
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            }
            else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
                //hash password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        //set password to hashed
                        newUser.password = hash;
                        // save user
                        newUser.save()
                        .then( user => {
                            req.flash(
                                'success_msg',
                                'You are now registered and can log in'
                              );
                            res.redirect('/users/login');
                        })
                        .catch(err => console.log(err));
                    });
                });
            }
        });
    }
});

// Login
userRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/my-account',
      failureRedirect: '/users/login',
      failureFlash: true
    })(req, res, next);
  });

// Logout
userRouter.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
  });

module.exports = userRouter;