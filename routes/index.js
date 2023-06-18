var express = require('express');
const ToyModel = require('../model/ToyModel');
const async = require('hbs/lib/async');
const AccountModel = require('../model/AccountModel');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('mainpage/homepage');
});
router.get('/product', async(req, res) => {
  var toys = await ToyModel.find({});
  res.render('mainpage/productpage', {toys : toys});
});
router.get('/product/detail/:id', async(req, res) => {
  var toys = await ToyModel.findById(req.params.id);
  res.render('mainpage/productdetailpage',{toys : toys});
});
//thanh toan
router.get('/cart', function(req, res, next) {
  res.render('mainpage/cartpage');
});
//dangnhap-dangki
router.get('/login-signup', function(req,res) {
  res.render('mainpage/login-signin.hbs')
});
router.post("/login", async(req, res) => {
  var adminEmail = "admin@gmail.com";
  var adminPassword = "123456";
  const email = req.body.email;
  const password = req.body.password;
  if (email === adminEmail && password === adminPassword) {
    res.redirect('admin');
  } else {
    // Kiểm tra trong cơ sở dữ liệu nếu email đã tồn tại
    const existingAccount = await AccountModel.findOne({ email });

    if (existingAccount) {
      // So sánh mật khẩu của tài khoản đã có trong cơ sở dữ liệu
      if (existingAccount.password === password) {
        // Đăng nhập thành công
        res.redirect('/');
      } else {
        // Sai mật khẩu
        res.redirect('/login-signup');
      }
    }
  }
})

router.post('/signup', async (req, res) => {
  await AccountModel.create(req.body);
  res.redirect('/login-signup');
});

module.exports = router;
