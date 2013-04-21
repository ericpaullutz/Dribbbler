$(document).ready(function(){

  var shot = [];

  function callback (data) {
    $.each(data.shots, function(id, obj) {
      shot[id] = obj;
    });    

    $.each(shot, function(i) {
      $("body").append('<img src="'+shot[i].image_url+'">');
      i++;
    });

  };

  $.ajax({
    dataType: "jsonp",
    url: "http://api.dribbble.com/shots/popular",
    data: {page: 1, per_page: 30},
    success: callback
  });

}); // End document ready function