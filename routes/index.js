var express = require('express');
var router = express.Router();

router.use('/admin', require('./admin'));
router.use('/api', require('./api'));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/aaa', function(req,res){
    res.render('err');
});




module.exports = router;
