var express = require('express');
const async = require('hbs/lib/async');
const ToyModel = require('../model/ToyModel');
const TheloaiModel = require('../model/TheloaiModel');
const CheckoutWaitModel = require('../model/CheckoutWaitModel');
const HistoryModelModel = require('../model/HistoryModel');
var router = express.Router();

router.get('/list', async (req, res) => {
    var toys = await ToyModel.find();
    res.render('admin/adminlist', { toys: toys });
});
router.get('/type', async (req, res) => {
    var theloai = await TheloaiModel.find();
    res.render('admin/adminlisttype', { theloai: theloai });
});
router.post('/type/add', async (req, res) => {
    await TheloaiModel.create(req.body);
    res.redirect('/admin/type');
});
router.get('/type/delete/:id', async (req, res) => {
    await TheloaiModel.findByIdAndDelete(req.params.id);
    res.redirect('/admin/type');
});
router.get('/add', async (req, res) => {
    var theloai = await TheloaiModel.find()
    res.render('admin/adminadd', { theloai: theloai });
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
    var theloai = await TheloaiModel.find();
    res.render('admin/adminedit', { toy: toy, theloai: theloai });
})
router.post('/edit/:id', async (req, res) => {
    await ToyModel.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/list');
})

router.get('/checkoutwait', async (req, res) => {
    var checkoutwait = await CheckoutWaitModel.find({ status: false });
    res.render('admin/admincheckoutwait', { checkoutwait: checkoutwait });
});
router.get('/checkoutwait/confirm/:id', async (req, res) => {
    await CheckoutWaitModel.findByIdAndUpdate(req.params.id, { status: true });
    res.redirect('/admin/checkoutwait');
})
router.get('/shipping', async (req, res) => {
    var checkoutshipping = await CheckoutWaitModel.find({ status: true });
    res.render('admin/adminshipping', { checkoutshipping: checkoutshipping });
})
router.post('/done/:id', async (req, res) => {
    await CheckoutWaitModel.findByIdAndDelete(req.params.id);
    await HistoryModelModel.create(req.body);
    res.redirect('/admin/shipping');
})
router.get('/history', async (req, res) => {
    var history = await HistoryModelModel.find();
    res.render('admin/adminhistory', { history: history });
})

router.post('/search', async (req, res) => {
    var email = req.body.email;
    var search = await HistoryModelModel.find({ email: email });
    var tongtien = 0;
    search.forEach(item => {
        tongtien += item.total;
    });
    res.render('admin/adminsearch', { search: search, email: email, tongtien: tongtien });
});
router.get('/statistic', async (req, res) => {
    var waiting = await CheckoutWaitModel.find({ status: false });
    var waitingtotal = 0; var waitingnumber = 0;
    waiting.forEach(item => {
        waitingtotal += item.total;
        waitingnumber += item.totalquantity;
    });
    var shipping = await CheckoutWaitModel.find({ status: true });
    var shippingtotal = 0; var shippingnumber = 0;
    shipping.forEach(item => {
        shippingtotal += item.total;
        shippingnumber += item.totalquantity;
    });
    var history = await HistoryModelModel.find();
    var historytotal = 0; var historynumber = 0;
    history.forEach(item => {
        historytotal += item.total;
        historynumber += item.totalquantity;
    });
    total = shippingtotal + historytotal + waitingtotal;
    res.render('admin/adminstatistic', { waitingnumber: waitingnumber, waitingtotal: waitingtotal, shippingnumber: shippingnumber, shippingtotal: shippingtotal,historynumber: historynumber, historytotal: historytotal, total: total });
});
module.exports = router;