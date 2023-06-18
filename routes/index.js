var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainpage/homepage');
});
router.get('/product', function(req, res, next) {
  res.render('mainpage/productpage');
});
router.get('/product/detail', function(req, res, next) {
  res.render('mainpage/productdetailpage');
});
//thanh toan
router.get('/cart', function(req, res, next) {
  res.render('mainpage/cartpage');
});

module.exports = router;
