var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var session = require('express-session');

router.use(session({
    secret: 'nothing',
    cookie: { secure: true, maxAge: 86400 },
    saveUninitialized: true
}));

router.use(function (req, res, next) {
    if (!req.session) {
        return next(new Error('redis session error'));
    }
    next();
});

router.use(function (req, res, next) {
    if (req.session.auth) return next();
    var auth = req.get('Authorization');
    if (!auth) {
        res.set('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).end('Authorization Required');
    }

    var token = auth.split(/\s+/).pop() || '';
    var parts = new Buffer(token, 'base64').toString().split(/:/);
    var username = parts[0];
    var password = parts[1];
    if (username === 'mengxi' && password === 'gotohell') {
        req.session.auth = username;
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm="Secure Area"');
        res.status(401).end('Authorization Required');
    }
});

router.get('/', function(req, res){
    db.article.find().toArray(function(err, list) {
        res.render('admin/admin.ejs',{articles:list || []});
    });
});

module.exports = router;