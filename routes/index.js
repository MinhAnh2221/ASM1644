var express = require('express');
const ToyModel = require('../model/ToyModel');
const AccountModel = require('../model/AccountModel');
const async = require('hbs/lib/async');
const TheloaiModel = require('../model/TheloaiModel');
var router = express.Router();

/* GET home page. */
router.get('/', async(req, res, next) => {
  var theloai = await TheloaiModel.find();
  res.render('mainpage/homepage', {theloai: theloai});
});
router.get('/product', async(req, res) => {
  var toys = await ToyModel.find({});
  var theloai = await TheloaiModel.find();
  res.render('mainpage/productpage', {toys : toys, theloai: theloai});
});
router.get('/product/detail/:id', async(req, res) => {
  var toys = await ToyModel.findById(req.params.id);
  var theloai = await TheloaiModel.find();
  res.render('mainpage/productdetailpage',{toys : toys,theloai: theloai});
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
  var account = req.body;
  await AccountModel.create(account)
  .then(()=> console.log('add ok'))
  .catch((err)=> console.log(err))
  res.redirect('/login-signup');
});

module.exports = router;
