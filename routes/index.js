var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.use('/admin', require('./admin'));
router.use('/api', require('./api'));

/* GET home page. */
router.get('/', function(req, res) {
    db.header.findOne({_id:'headerbackground'},function(err,data){
        res.render('index',{img:data.img || 'http://imgout.ph.126.net/34814010/autum.jpg'});
    })
});

router.get('/aaa', function(req,res){
    res.render('err');
});




module.exports = router;
