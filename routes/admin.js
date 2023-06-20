var express = require('express');
const async = require('hbs/lib/async');
const ToyModel = require('../model/ToyModel');
const TheloaiModel = require('../model/TheloaiModel');
const CheckoutWaitModel = require('../model/CheckoutWaitModel');
const CheckoutShippingModel = require('../model/CheckoutShipping');
var router = express.Router();

router.get('/list', async (req, res) => {
    var toys = await ToyModel.find();
    res.render('admin/adminlist', {toys:toys});
});
router.get('/type', async (req, res) => {
    var theloai = await TheloaiModel.find();
    res.render('admin/adminlisttype', {theloai:theloai});
});
router.post('/type/add', async (req, res) => {
    await TheloaiModel.create(req.body);
    res.redirect('/admin/type');
});
router.get('/type/delete/:id', async (req, res) => {
    await TheloaiModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin/type');
});
router.get('/add',async(req, res) => {
    res.render('admin/adminadd');
});
router.post('/create', async (req, res) => {
    await ToyModel.create(req.body);
    res.redirect('/admin/list');
})
router.get('/delete/:id', async (req, res) => {
    await ToyModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin/list');
});
router.get('/edit/:id', async (req, res) => {
    var toy = await ToyModel.findById(req.params.id);
    res.render('admin/adminedit', { toy:toy});
 })
 router.post('/edit/:id', async (req, res) => {
   await ToyModel.findByIdAndUpdate(req.params.id,req.body);
    res.redirect('/admin/list');
 })

 router.get('/checkoutwait', async (req, res) => {
    var checkoutwait = await CheckoutWaitModel.find();
    res.render('admin/admincheckoutwait', { checkoutwait: checkoutwait });
 });
 router.get('/checkoutwait/confirm/:id',async (req, res) =>{
    var shipping = await CheckoutWaitModel.findById(req.params.id);
    console.log(shipping);
    const newShipping = new CheckoutShippingModel({
        email: shipping.email,
        name: shipping.name,
        phone: shipping.phone,
        address: shipping.address,
        note: shipping.note,
        totalquantity: shipping.totalquantity,
        total: shipping.total,
        status: true,
      });
      await newShipping.save();
    await CheckoutShippingModel.create(newShipping);
    await CheckoutWaitModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin/checkoutwait');
 })
module.exports = router;