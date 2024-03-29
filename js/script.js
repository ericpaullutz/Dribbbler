$(document).ready(function(){

  var shot = [];
  var img_count = 3;
  //Implement these
  var page_num = (Math.random()*10).toFixed();
  var per_page = 30;
  var current_shot = img_count;
  var initial_run = true;
  var refresh = 20000;


  function createShots (data) {
    $.each(data.shots, function(id, obj) {
      shot[id] = obj;
    });
    if (initial_run === true) {
      setupDribbbler();
      initial_run = false;
    }
    else {
      showNextShot;
    }
  }

  function setupDribbbler () {
    for (var i = 0; i < img_count; i++) {
      var image = shot[i].image_url;
      $("body").append('<a href="'+image+'" rel="lightbox"><img id="'+i+'" src="'+image+'"></a>');
    }
  }

  function showNextShot () {
    var img_num = (Math.random()*(img_count - 1 )).toFixed();

    if (current_shot < per_page) {
      $("#"+img_num).attr("src", shot[current_shot].image_url);
      current_shot ++;
    }
    else {
      current_shot = 0;
      if (page_num < 10){
        ++page_num;
      }
      else {
        page_num = 1;
      }
      getShots(page_num);
    }
  }

  function getShots (page) {
    $.ajax({
      dataType: "jsonp",
      url: "http://api.dribbble.com/shots/popular",
      data: {page: page, per_page: per_page},
      success: createShots
    });
  }

  function adjustElements () {
    $("body").css("height", $(window).height());
    top_percent = ((($("a").height())-($("img").height()))/2);
    $("img").css("top", top_percent+"px");
  }


  //getShots(1, callback)
  getShots((Math.random()*10).toFixed());
  //window.setInterval(getNextShot, 7000);
  window.setInterval(showNextShot, refresh);

  adjustElements();

  $(window).resize(adjustElements);

}); // End document ready function