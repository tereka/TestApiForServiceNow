// Test Sample code for Web API with MySql(For Test ServiceNow REST API)
// index.js
//
// 1. To Get All DB Server Info
// http://localhost:3000/dbinfo, http://localhost:3000/dbinfo?product=
//
// 2. To Get Seclected DB Server Info
// http://localhost:3000/dbinfo?product={productName}
//
//
// 3. To Get All User Info
// http://localhost:3000/userinfo, http://localhost:3000/userinfo?name=
//
// 4. To Get selected User Info
// http://localhost:3000/userinfo?name={name}


'use strict';

var express = require('express');
var mysql = require('mysql');
var PORT = 3000;

// init MySQL
var connection = mysql.createConnection({
  host      : 'localhost',
  port      : 3306,
  user      : 'snow',
  password  : 'snowpasswd',
  database  : 'servicenow'
});

// define Web API
var app = express();
app.listen(PORT);
console.log("Server Started.... port: " + PORT);
console.log("\n\n");

// Router
app.get('/', function(req, res) {
  console.log(Object.keys(req.params));
  console.log(JSON.stringify(req.params));
  JSON.stringify(req.params)
  return;
});

// http://localhost:3000/dbinfo?product={product name}
app.get('/dbinfo', function(req, res) {
  let param = req.query.product;
  let sql = "";

  console.log('req.params = ' + JSON.stringify(req.params));
  console.log(JSON.stringify(req.params));
  console.log('req.query.product = ' + param);
  console.log(res.results);

  if(res.results >= 400) {
    res.send("URL not found.");
    return;
  }

  if (param == undefined || param.length === 0) {
    sql = 'select * from T_DBSERVER_INFO ';
  } 
  else {
    sql = 'select * from T_DBSERVER_INFO where rdbms_name = ? ';
  }
  // run Query
  connection.query(sql, [param], 
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
        res.send("Data not found.");
    }
  });
});

// http://localhost:3000/userinfo?name={name}
app.get('/userinfo', function(req, res) {
  let param = req.query.name;
  let sql = "";

  console.log('req.params = ' + JSON.stringify(req.params));
  console.log(JSON.stringify(req.params));
  console.log('req.query.name = ' + param);
  console.log(res.results);

  if(res.results >= 400) {
    res.send("URL not found.");
    return;
  }

  if (param == undefined || param.length === 0) {
    sql = 'select * from T_USER ';
  } 
  else {
    sql = 'select * from T_USER where name = ? ';
  }
  // run Query
  connection.query(sql, [param], 
    function (error, results, fields) {
      if (error) {
        console.error('dbinfo query error : ' + error.stack);
        return;
      }
      console.log("userinfo query OK...");
      if(results.length !== 0) {
        res.send(JSON.stringify(results));
      }
      else {
        res.send("data not found.");
    }
  });
});


// // http://localhost:3000/dbinfo/db/{product}
// app.get('/dbinfo/db/:product', function(req, res) {
//   console.log(req.params);
//   let product = req.params.product;
//   console.log('req.params.product = ' + product);
//   // run Query
//   connection.query( 
//     'select * from T_DBSERVER_INFO where rdbms_name = ? ;', 
//     [product],
//     function (error, results, fields) {
//     if (error) {
//       console.error('dbinfo query error : ' + error.stack);
//       return;
//     }
//     console.log("dbinfo query OK...");
//     if(results.length !== 0) {
//       res.send(JSON.stringify(results));
//     }
//     else {
//       res.send("none.");
//     }
//   });
// });
