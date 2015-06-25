var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/signup');
var signupCollection = db.get('signup');
var bcrypt = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var loggedin = req.cookies.loggedin
  var error = req.query.error;
  var visits = parseInt(req.cookies.visits, 10) || 0;
    visits ++
    res.cookie('visits', visits);
  res.render('index', {
    title: 'Fake Login',
    visits: visits,
    loggedin: loggedin,
    error: error,
    });
});

router.post('/signup', function(req, res, next){
  res.cookie('currentUser', req.body.email);
  var hash = bcrypt.hashSync(req.body.password, 8);
  signupCollection.insert({username: req.body.email, password: hash}, function (err, record) {
    res.redirect('/');
  });
});

router.post('/login', function(req, res, next){
  signupCollection.findOne({ username: req.body.login_email}, function(err, data){
    if(data) //if email exists in DB
    var compare = bcrypt.compareSync(req.body.login_password, data.password);
    if (compare === true) {
      res.cookie('loggedin', req.body.login_email);
      res.redirect('/');
    }
    else {
      res.redirect('/?error=BOO!!');
    };
  });
});

router.post('/logout', function(req, res, next){
  res.clearCookie('visits');
  res.clearCookie('loggedin');
  res.redirect('/');
});

module.exports = router;
