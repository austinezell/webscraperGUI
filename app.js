"use strict"
const express = require('express');
const app = express();
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');

app.use(express.static(path.join(__dirname, 'public')))
app.get('/', (req, res)=>{
  res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/url/:url', (req, res) =>{
  const url = `http://${req.params.url}`;
  request(url, (err, response, html)=>{
    if(!err){
      let sanitizedHTML = html.match(/<body(.|\s)+<\/body>/g)[0].replace(/<script(.|\s)+<\/script>/, "")
      sanitizedHTML = sanitizedHTML.replace(/"/g, '\'').replace(/src='.+'/g, function(text){
        text = text.replace(/src='/g, `src='${url}/`).replace(/srcset='/g, `srcset='${url}/`)
        return text;
      })
      let $ = cheerio.load(sanitizedHTML);
      let classNames = [];
      let ids = [];
      let elements = [];
      $("*").each(function(i){
        let $element = $(this);
        let elementType = $element.prop('nodeName').toLowerCase();
        if (elements.indexOf(elementType) < 0){
          elements.push(elementType);
        }
        if ($element.attr('class')){

          let thisClasses = $element.attr("class").toString().split(/\s+/);
          for (let className of thisClasses){
            if (classNames.indexOf(className) < 0){
              classNames.push(`.${className}`);
            }
          }
        }
        if ($element.attr('id')){
          let id = $element.attr("id");
          ids.push(`#${id}`);
        }
      })
      res.send({sanitizedHTML, types: {ids, elements, classNames}})
    }
    else{
      return res.status(404).send('url not found')
    }
  })
})

app.listen(4000, function(){
  console.log('listening on port 4000');
})
