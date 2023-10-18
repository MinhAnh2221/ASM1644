var express = require('express');
const ToyModel = require('../model/ToyModel');
const AccountModel = require('../model/AccountModel');
const TheloaiModel = require('../model/TheloaiModel');
const CartModel = require('../model/CartModel');
const async = require('hbs/lib/async');
const CheckoutWaitModel = require('../model/CheckoutWaitModel');
const HistoryModelModel = require('../model/HistoryModel');
var router = express.Router();
var an = "none";
var hien = "block";
var emailuser = null;

/* GET home page. */
router.get('/', async (req, res, next) => {
  var theloai = await TheloaiModel.find();
  if(emailuser == null){
  res.render('mainpage/homepage', { theloai: theloai, displayUnlog: hien, displayLog: an});}
  else {
    res.render('mainpage/homepage', { theloai: theloai, displayUnLog: an,displayLog: hien });
  }
});
router.get('/product', async (req, res) => {
  var toys = await ToyModel.find({});
  var theloai = await TheloaiModel.find();
  if(emailuser == null){
  res.render('mainpage/productpage', { toys: toys, theloai: theloai, displayUnlog: hien, displayLog: an});}
  else {
    res.render('mainpage/productpage', { toys: toys, theloai: theloai, displayUnLog: an,displayLog: hien });
  }
});
router.get('/product/:theloai', async (req, res) => {
    var protucttheloai = await ToyModel.find({theloai: req.params.theloai});
    var theloai = await TheloaiModel.find();
    if(emailuser == null){
      res.render('mainpage/productpage', {toys: protucttheloai,theloai:theloai, displayUnlog: hien, displayLog: an});}
      else {
        res.render('mainpage/productpage', {toys: protucttheloai,theloai: theloai, displayUnLog: an,displayLog: hien });
      }
    
})
router.get('/product/detail/:id', async (req, res) => {
  var toys = await ToyModel.findById(req.params.id);
  var theloai = await TheloaiModel.find();
  if(emailuser == null){
    res.render('mainpage/productdetailpage', {toys: toys, theloai: theloai, displayUnlog: hien, displayLog: an });}
    else {
      res.render('mainpage/productdetailpage', {toys: toys, theloai: theloai,displayUnLog: an,displayLog: hien  });
    }
});
router.post('/addtocart/:id', async (req, res) => {
  if (emailuser != null) {
    const toy = await ToyModel.findById(req.params.id);
    var soluongtruoc = toy.soluong;
    var soluongmua = req.body.soluong;
    var soluongsau = soluongtruoc - soluongmua;
    console.log(req.body)
    await CartModel.create({
      ten: req.body.ten,
      anh: req.body.anh,
      soluong: req.body.soluong,
      gia: req.body.gia,
      email: emailuser,
    })
    await ToyModel.findByIdAndUpdate(req.params.id, { soluong: soluongsau });
    res.redirect('/product')
  } else res.redirect('/login');
});
//search
router.post('/search', async (req, res) => {
  var keyword = req.body.name;
  var theloai = await TheloaiModel.find();
  var thongbao;
  var toys = await ToyModel.find({ ten: new RegExp(keyword, "i")})
  console.log(toys.length);
  if (toys.length > 1 ) {
    thongbao = "Not Found";
    res.render('mainpage/productpage', {theloai: theloai,thongbao:thongbao})
  } 
  else  {res.render('mainpage/productpage', { toys: toys,theloai: theloai,thongbao:thongbao})}
  ;
});
//thanh toan
router.get('/cart', async (req, res, next) => {
    var cart = await CartModel.find({email: emailuser});
    console.log(cart);
    var tongtien = 0; 
    cart.forEach(item => {
      var thanhtien = item.soluong * item.gia;
      tongtien += thanhtien;
      item.thanhtien = thanhtien;
    });
    if(emailuser == null){
      res.render('mainpage/cartpage', {cart: cart, tongtien: tongtien, displayUnlog: hien, displayLog: an });}
      else {
        res.render('mainpage/cartpage', {cart: cart, tongtien: tongtien,displayUnLog: an,displayLog: hien  });
      }
});
router.post('/cart/delete/:id', async (req, res) => {
  const toy = await ToyModel.findOne({ten: req.body.ten});
  var soluongtruoc = toy.soluong;
  var cart = await CartModel.findById(req.params.id);
  var soluongkhongmua = cart.soluong;
  var soluongsau = soluongtruoc + soluongkhongmua;
  await ToyModel.findOneAndUpdate({ten: req.body.ten},{soluong: soluongsau});;
  await CartModel.findByIdAndDelete(req.params.id)
  res.redirect('/cart');
})
//checkout
router.get('/checkout',async (req, res) => {
  var account = await AccountModel.findOne({email: emailuser});
  var carts = await CartModel.find({email: emailuser});
  var tongtien = 0;
  var tongsoluong = 0;
  carts.forEach(item => {
    var thanhtien = item.soluong * item.gia;
    tongtien += thanhtien;
    tongsoluong  += item.soluong;
    item.thanhtien = thanhtien;
  });
  if(emailuser == null){
  res.redirect('/');}
  else {
    res.render('mainpage/checkoutpage',{displayUnLog: an, displayLog: hien, account: account, carts: carts,tongtien:tongtien, tongsoluong: tongsoluong})
  }
})
router.get('/checkoutproduct',async (req, res) => {
  var checkproductwait = await CheckoutWaitModel.find({email: emailuser});
  var history = await HistoryModelModel.find({email: emailuser})
  if(emailuser == null){
    res.redirect('/');}
    else {
      res.render('mainpage/checkoutproduct',{displayUnLog: an, displayLog: hien,checkproductwait: checkproductwait,history: history})
    }
})
router.post('/checkoutprocess',async (req, res)=>{
  await CheckoutWaitModel.create(req.body);
  await CartModel.deleteMany({email: emailuser})
  res.redirect('/');
});
router.post('/checkout/delete/:id', async (req, res) => {
  const toy = await ToyModel.findOne({ten: req.body.ten});
  var soluongtruoc = toy.soluong;
  var cart = await CartModel.findById(req.params.id);
  var soluongkhongmua = cart.soluong;
  var soluongsau = soluongtruoc + soluongkhongmua;
  await ToyModel.findOneAndUpdate({ten: req.body.ten},{soluong: soluongsau});;
  await CartModel.findByIdAndDelete(req.params.id)
  res.redirect('/checkout');
})
router.get('/checprodcut',async (req, res) => {

})
//dangnhap-dangki
router.get('/login', function (req, res) {
  res.render('mainpage/login.hbs')
});
router.post("/login", async (req, res) => {
  var adminEmail = "admin@gmail.com";
  var adminPassword = "123456";
  const email = req.body.email;
  const password = req.body.password;
  if (email === adminEmail && password === adminPassword) {
    res.redirect('admin/list');
  } else {
    // Kiểm tra trong cơ sở dữ liệu nếu email đã tồn tại
    const existingAccount = await AccountModel.findOne({ email });

    if (existingAccount) {
      // So sánh mật khẩu của tài khoản đã có trong cơ sở dữ liệu
      if (existingAccount.password === password) {
        // Đăng nhập thành công
        var theloai = await TheloaiModel.find();
        condition = true;
        emailuser = email;
        res.redirect('/');
      } else {
        // Sai mật khẩu
        res.redirect('/login');
      }
    }
  }
})
router.get('/signup', function (req, res) {
  res.render('mainpage/signup.hbs')
});
router.post('/signup', async (req, res) => {
  var account = req.body;
  await AccountModel.create(account)
    .then(() => console.log('add ok'))
    .catch((err) => console.log(err))
  res.redirect('/login');
});
router.get('/logout', function (req, res) {
  condition = false;
  emailuser = null;
  res.redirect('/');
})

module.exports = router;
