var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/article/all', function (req, res) {
    db.article.find({publish:true}).toArray(function (err, list) {
        res.send({list: list || []});
    })
});

router.post('/article/save', function(req, res) {
    req.body.publish = req.body.publish == 'true'? true : false;
    console.log(req.body);

    db.article.insert(req.body,function(err){
        if(err) return res.send({status:-1});
        res.send({status:0})
    })
});

module.exports = router;