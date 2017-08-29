const express = require('express');
const app = express();
const jsonFile = require('jsonfile');
const bodyParse = require('body-parser');
const db = './db/mockdb.json';
const routeApp = express.Router();
app.use(express.static(__dirname));
app.use(bodyParse.json());

/**
 * Get Route 
 */

routeApp.get('/data', function(req, res) {
  console.log(process.env.PORT);
  jsonFile.readFile(db, function(err, obj){
    if (err) {
      res.status(500).send({
        error: err,
      })
    }
    res.status(200).send({
      port: process.env.PORT,
      list: obj
    });
  });
})

/**
 * POST Route 
 */

routeApp.post('/data', function(req, res) {
  let body = {
    name: req.body.name
  };
  jsonFile.readFile(db, function(err, obj){
    if (err) {
      res.status(500).send({
        error: err,
      })
    }
    let data = obj;
    obj.push(body);
    jsonFile.writeFile(db, data, function(err){
      if (err) {
        res.status(500).send({
          error: err,
        })
      }
  
      jsonFile.readFile(db, function(err, obj){
        if (err) {
          res.status(500).send({
            error: err,
          })
        }
        res.status(200).send(obj);
      });;
    })
  });
})

app.use('/api', routeApp);
/**
 * Listen
 */

app.listen(process.env.PORT, function(err) {
  if (err) {
    console.log(err);
  }

  console.log(`Server is listening at port ${process.env.PORT}`);
});

app.get('*', function(req, res) {
  res.sendFile(__dirname + '/view/index.html');
});