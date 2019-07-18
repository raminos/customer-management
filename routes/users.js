const express = require('express');
const passport = require('passport');
const auth = require('../auth/auth');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const router = express.Router();

router.use(bodyParser.json());

router.route('/register')
  .post((req, res, next) => {
    User.register(new User({ email: req.body.email }),
      req.body.password, (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({ err: err });
          return;
        }
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.lastName) user.lastName = req.body.lastName;
        user.save((err, user) => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err: err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful!' });
          })
        })
      })
  });

router.route('/login')
  .post(passport.authenticate('local'), (req, res, next) => {
    let token = auth.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'Login Successful!' })
  });

router.route('/')
  .get(auth.verifyUser, auth.verifyAdmin, (req, res, next) => {
    User.find({})
      .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
      })
      .catch((err) => next(err)); 
  });

module.exports = router;