let express = require('express');
let router = express.Router();


// get home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// get home page
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home' });
});



router.get('/about', function(req, res, next) {
  res.render('error', { title: 'About' });
});

// get fish page
router.get('/login', function(req, res, next) {
  res.render('error', { title: 'Login' });
});

module.exports = router;