var express = require('express');
var router = express.Router();
var db = require('../lib/db');

function generateID() {
    var id = '';
    var dictionary = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    for (var i = 0; i <= 22; i++) {
        id += dictionary[Math.floor(Math.random() * 36)]
    }
    id += Date.now();
    return id;
}

router.get('/article/all', function (req, res) {
    db.article.find({publish: true}).sort({time: -1}).skip(((req.query.page - 1) * req.query.limit) || 0).limit(req.query.limit || 0).toArray(function (err, list) {
        res.send({list: list || []});
    })
});

router.post('/article/save', function (req, res) {
    req.body.publish = req.body.publish == 'true' ? true : false;
    console.log(req.body);
    req.body._id = generateID();
    req.body.time = Date.now();
    db.article.insert(req.body, function (err) {
        if (err) return res.send({status: -1});
        res.send({status: 0})
    })
});

router.post('/article/modify/:id', function (req, res) {
    req.body.publish = req.body.publish == 'true' ? true : false;
    db.article.findAndModify({_id: req.params.id}, [], {$set: req.body}, {new: true}, function (err) {
        if (err) return res.send({status: -1});
        res.send({status: 0});
    })
});

router.get('/article/one/:id', function (req, res) {
    db.article.findOne({_id: req.params.id}, function (err, data) {
        if (err || !data) return res.send({status: -1, data: {}});
        res.send({status: 0, data: data});
    })
});

router.post('/header/modify', function (req, res) {
    db.header.findAndModify({_id: 'headerbackground'}, [], {$set: {img: req.body.img}}, {new: true, upsert: true}, function (err) {
        if (err) return res.send({msg: 'failed'});
        res.send({msg: 'success'});
    })
});

router.get('/header/get', function (req, res) {
    db.header.findOne({_id:'headerbackground'},function(err, data){
        res.send({data:data.img});
    });
});

module.exports = router;