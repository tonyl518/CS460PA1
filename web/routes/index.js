const express = require('express');
const router = express.Router();
const {Client} = require('pg');
var table = {}
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {title: 'Data query'});
});

router.post('/select', function (req, res, next) {
  console.log(req.body)
  if (req.body.Table){
    var tab = req.body.Table;
    
    if (Array.isArray(tab)){
      if (tab.includes('users')){table.users='users'}
      if (tab.includes('checkins')){table.checkins='checkins'}
      if (tab.includes('business')){table.business='business'}
      if (tab.includes('reviews')){table.reviews='reviews'}
    }
    else {
      if (tab=='users'){table.users='users'}
      if (tab=='checkins'){table.checkins='checkins'}
      if (tab=='business'){table.business='business'}
      if (tab=='reviews'){table.reviews='reviews'}
    }
    res.render('select', {table:table});
  } 
  else {
    var index = req.body.index;
    if (!Array.isArray(index)){
      index=[index]
    }
    console.log(table)
    var query = "SELECT ";
    for (var i=0; i<index.length;i++){
      query += index[i]+','
    }
    query = query.substring(0,query.length-1)
    query += " FROM "
    for (var i in table){
      query += table[i] + ','
    }
    query = query.substring(0,query.length-1)+' WHERE '
    var temp = req.body
    delete temp.index
    for (var i in temp){
      if (!temp[i]==''){
        query += String(i) +' = '+temp[i] + ' AND '
      }
    }
    query = query.substring(0,query.length-4)
    console.log(query)
    var pgclient = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'postgres',
      password: 'lsy631029',
      port: 5432
    });
    pgclient.connect();
    pgclient.query(query, (err,ress) =>{
    
      console.log(err);
      console.log(ress)
      res.render('select', {table:table,result:ress.rows});
      
    })
    
  }
  
  
});

router.get('/insert', function (req, res, next) {
  res.render('insert', {title: 'Data query'});
});

router.get('/update', function (req, res, next) {
  res.render('update', {title: 'Data query'});
});

router.get('/delete', function (req, res, next) {
  res.render('delete', {title: 'Data query'});
});

router.post('/', function(req, res, next) {
  const que = req.body.ingredients;

  var pgclient = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'lsy631029',
    port: 5432
  });
  pgclient.connect();
  pgclient.query(que, (err,ress) =>{
  
    console.log(err);
    res.render('index', {'result':ress.rows});
  })
  
  
  

});

module.exports = router;
