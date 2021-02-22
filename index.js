const express = require('express');
const https = require('https');
const fs = require('fs');
var ip = require("ip");
var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

const port = 8000;

app = express()
app.use(express.static('static'));

var server = https.createServer(options, app);

server.listen(port, '0.0.0.0', () => {
	console.log("server ready: https://" + ip.address() + ":" + port);
});