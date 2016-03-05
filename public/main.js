'use strict';

$(document).ready(function(){
  const $addURL = $("#addURL");
  const $url = $('#url');
  const $sanitizedHTML = $("#sanitizedHTML");
  const $classNames = $("#classNames");
  const $ids = $("#ids");
  const $elements = $("#elements");
  $addURL.on("click", addURL)
  $("body").on("click", "a", function(e){
    e.preventDefault()
  })
  $classNames.on("click", "selector", attributeSelect)

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
        let $a = $("<a>").attr("href", "").addClass('selector').text(selector);
        let $li = $("<li>").append($a);
        $ul.append($li)
      }
      thisDiv.html($ul)
    }
    $sanitizedHTML.html(data.sanitizedHTML)
  }

  function attributeSelect(){
    $(this).toggleClass('active');
    $('.active').each
  }
})
