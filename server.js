var express = require('express');
var mongoose = require('mongoose');
var app = express();
var connectionString = 'mongodb://127.0.0.1:27017/assignmentMongoDB';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
 connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
     process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
     process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
     process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
     process.env.OPENSHIFT_APP_NAME;
 }

var db = mongoose.connect(connectionString);


app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/', function(req, res){
    res.sendfile('/public/landing.html', {root: __dirname });
});

require("./public/assignment/server/app.js")(app, db, mongoose);
require("./public/project/server/app.js")(app, db, mongoose);

app.listen(port, ipaddress);