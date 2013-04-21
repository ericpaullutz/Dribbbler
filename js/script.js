$(document).ready(function(){

  var shot = [];

  function callback (data) {
    $.each(data.shots, function(id, obj) {
      shot[id] = obj;
    });    

    for (var i = 0; i < 12; i++) {
      $("body").append('<img id="'+i+'" src="'+shot[i].image_url+'">');
    }
  }

  $.ajax({
    dataType: "jsonp",
    url: "http://api.dribbble.com/shots/popular",
    data: {page: 1, per_page: 30},
    success: callback
  });


  function callbackNextShot (data) {
    var shot_num = (Math.random()*30).toFixed();
    var img_num = (Math.random()*11).toFixed();

    $.each(data.shots, function(id, obj) {
      shot[id] = obj;
    });

    $("#"+img_num).attr("src", shot[shot_num].image_url);
  }

  function getNextShot () {
    var page_num = (Math.random()*10).toFixed();
    $.ajax({
      dataType: "jsonp",
      url: "http://api.dribbble.com/shots/popular",
      data: {page: page_num, per_page: 30},
      success: callbackNextShot
    });
  }

  window.setInterval(getNextShot, 5000);

}); // End document ready function