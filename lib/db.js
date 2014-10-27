var mongo = require('mongoskin');
var db = mongo.db('mongodb://127.0.0.1:27017/z2z', {"native_parser": true});

db.bind('article');



module.exports = db;