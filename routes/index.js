var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/signup');
var signupCollection = db.get('signup');

router.get('/', function(req, res, next) {
  signupCollection.find({}, function (err, data) {
    res.render('index', {allsignup: data});
  });
});

router.get('/new', function(req, res, next) {
  res.render('/new');
});

router.post('/signup', function(req, res, next) {
  signupCollection.insert({email: req.body.email, password: req.body.password, pwconfirm: req.body.pwconfirm});
    res.redirect('/')
});

router.post('/logout', function(req, res, next) {
  res.clearCookie('visits');
  res.clearCookie('currentUser');
  res.redirect('/');
});

module.exports = router;
