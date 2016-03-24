var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());
app.use(express.methodOverride());
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.get('/', function(req, res){
    res.sendfile('/public/landing.html', {root: __dirname });
});
require("./public/assignment/server/app.js")(app);
require("./public/project/server/app.js")(app);
app.listen(port, ipaddress);