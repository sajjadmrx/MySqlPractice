var mysql = require('mysql');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');



var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});