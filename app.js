"use strict"
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/url/:url', (req, res) =>{
  request(req.params.url, (err, res, html)=>{
    if(!err){
      console.log(html);
    }
  })
})

app.listen(4000, function(){
  console.log('listening on port 4000');
})
