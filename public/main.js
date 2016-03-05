'use strict';

$(document).ready(function(){
  const $addURL = $("#addURL");
  const $url = $('#url');

  $addURL.on("click", addURL)

  function addURL(){
    let url = $url.val()
    url = url.replace(/http:\/\/|https:\/\//, "")
    $.get(`/url/${url}`)
    .success((data)=>{
      appendData(data);
    })
    .error(err=>{
      console.log(err);
    })
  }

  function appendData(data){
    for (let key in data.types){
      let thisDiv = $(`#${key}`)
      let $ul = $("<ul>");
      for(let selector of data.types[key]){
        let $li = $("<li>").text(selector)
        $ul.append($li)
      }
      thisDiv.append($ul)
    }
    $("#sanitizedHTML").html(data.sanitizedHTML)
  }
})
