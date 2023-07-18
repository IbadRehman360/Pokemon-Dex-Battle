const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/register', (req, res) => {
  res.render('auth/register');
});

router.post('/register', async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });

    const registeredUser = await User.register(user, password);

    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to Yelp Camp!');
      res.redirect('pokemon');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
});

router.get('/login', (req, res) => {
  res.render('auth/login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Passport authentication error:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (!user) {
      console.log('Authentication failed:', info.message);
      return res.status(401).redirect('/login'); 
    }

    req.logIn(user, (err) => {
      if (err) {
        console.error('Error during login:', err);
        return res.status(500).send('Internal Server Error');
      }
      console.log('User successfully logged in:', user.username);
      req.flash('success', 'Successfully logged in!');
      return res.redirect('/pokemon');
    });
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      req.flash('error', err.message);
      res.redirect('pokemon');
    } else {
      req.flash('success', 'Goodbye!');
      res.redirect('pokemon');
    }
  });
});
module.exports = router;
