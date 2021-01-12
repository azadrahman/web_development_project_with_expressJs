const express = require('express');
const router = express.Router();

const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//Home Page
router.get('/',  (req, res) => {
  res.render('index');
});

router.get('/index',  (req, res) => {
  res.render('index');
});

// Welcome Page
router.get('/welcome', (req, res) => {
    res.render('welcome');
});

//about page
router.get('/aboutUs', (req, res) => {
  res.render('aboutUs');
});

// search not found page
router.get('/not-found', (req, res) => {
  res.render('not-found');
});

// contact us page
router.get('/contact', (req, res) => {
  res.render('contact');
});

// shop us page
router.get('/shop', (req, res) => {
  res.render('shop');
});

// cart page
router.get('/cart', ensureAuthenticated, (req, res) => {
  res.render('cart', { user: req.user })
});

// shop detail page
router.get('/shop-detail', ensureAuthenticated, (req, res) => {
  res.render('shop-detail', { user: req.user });
});

// wishlist page
router.get('/wishlist', ensureAuthenticated, (req, res) =>
  res.render('wishlist', {
    user: req.user
  })
);

// page after login
router.get('/my-account', ensureAuthenticated, (req, res) =>
  res.render('my-account', {
    user: req.user
  })
);

// checkout page
router.get('/home', ensureAuthenticated, (req, res) =>
  res.render('home', {
    user: req.user
  })
);

// dashboard page
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;