// Test Sample code for Web API with MySql(For Test ServiceNow REST API)
// ndex.js

'use strict';

var express = require('express');
var mysql = require('mysql');
var PORT = 8080;


// init MySQL
var connection = mysql.createConnection({
  host     : '192.168.84.102',
  port : 3306,
  user     : 'snow',
  password : 'snowpasswd',
  database : 'servicenow'
});

// define Web API
var app = express();
app.listen(PORT);
console.log("Server Started.... port: " + PORT);
console.log("\n\n");

// http://192.168.84.102:8080/dbinfo
app.get('/dbinfo', function(req, res) {
  console.log(req.params);
  // run Query
  connection.query( 'select * from T_DBSERVER_INFO;', function (error, results, fields) {
    if (error) {
      console.error('dbinfo query error : ' + error.stack);
      return;
    }
    console.log("dbinfo query OK...");
    if(results.length !== 0) {
      res.send(JSON.stringify(results));
    }
    else {
      res.send("none.");
    }
  });
});


// http://192.168.84.102:8080/dbinfo/db/{rdbms_name}
app.get('/dbinfo/db/:rdbms_name', function(req, res) {
  console.log(req.params);
  let rdbms_name = req.params.rdbms_name;
  console.log('req.params.rdbms_name = ' + req.params.rdbms_name);
  // run Query
  connection.query( 
    'select * from T_DBSERVER_INFO where rdbms_name = ? ;', 
    [rdbms_name],
    function (error, results, fields) {
    if (error) {
      console.error('dbinfo query error : ' + error.stack);
      return;
    }
    console.log("dbinfo query OK...");
    if(results.length !== 0) {
      res.send(JSON.stringify(results));
    }
    else {
      res.send("none.");
    }
  });
});

// http://192.168.84.102:8080/userinfo
app.get('/userinfo', function(req, res) {
  console.log(req.params);
  // run Query
  connection.query( 'select * from T_USER;', function (error, results, fields) {
    if (error) {
      console.error('userinfo query error : ' + error.stack);
      throw error;
    }
    console.log("userinfo query OK...");
    if(results.length !== 0) {
      res.send(JSON.stringify(results));
    }
    else {
      res.send("none.");
    }
  });
});

// http://192.168.84.102:8080/userinfo/name/{name}
app.get('/userinfo/name/:name', function(req, res) {
  console.log(req.params);
  let name = req.params.name;
  console.log('req.params.name = ' + req.params.name);
  // run Query
  connection.query( 'select * from T_USER where name = ? ;',
  [name],
  function (error, results, fields) {
    if (error) {
      console.error('userinfo query error : ' + error.stack);
      throw error;
    }
    console.log("userinfo query OK...");
    if(results.length !== 0) {
      res.send(JSON.stringify(results));
    }
    else {
      res.send("none.");
    }
  });
});

