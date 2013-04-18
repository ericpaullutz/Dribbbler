$(document).ready(function(){

  function callback (data) {
    $.each(data.shots, function(key, val) {
      //items.push('<li id="' + key + '">' + val + '</li>');
      console.log(key);
      console.log(val);
    });
  };

  $.ajax({
    dataType: "jsonp",
    url: "http://api.dribbble.com/shots/",
    success: callback
  });

}); // End document ready function