// https://wind-bow.glitch.me/twitch-api/users/<<account name>>
// https://wind-bow.glitch.me/twitch-api/channels/<<account name>>
// https://wind-bow.glitch.me/twitch-api/streams/<<account name>>>
var users = [
  "showashidden",
  "freecodecamp",
  "xposedlive",
  "drdisrespectlive",
  "grimmmz",
  "c9sneaky",
  "shticky",
  "wyvernslayr"
];

var mouseClickable = 0;
var result = $('.results');
var allBtn = $('.all');
var onlineBtn = $('.online');
var offlineBtn = $('.offline');

function loadAPI(index) {
    var status, name, logo, theURL;

    index = index || 0;

    if (index == users.length) {
      return;
    }
    else {
      var user = users[index];
      $.getJSON('https://wind-bow.glitch.me/twitch-api/streams/' + user, function(data){
        console.log(data);
        var statusDisplay = $('.desc');
        console.log( index );
        if (data["stream"] != null) {
          // console.log(data["stream"]["channel"]["status"]);
          status = data["stream"]["channel"]["status"];
        }
        else {
          status = "Offline";
        }

        console.log(status);
        statusDisplay.html(status);
      })
      .done(function() {
        $.getJSON('https://wind-bow.glitch.me/twitch-api/channels/' + user, function(data){
          console.log( index );
          // console.log( JSON.stringify(data) );

          logo = data["logo"];
          name = data["display_name"];
          theURL = data["url"];

          console.log(status);
          console.log( user,name,theURL );

        })
        .done(function() {
          if (status == "Offline") {
            result.append(
              '<div class="item off">' +
              '<div class="logo"><img src="' + logo + '" alt=""></div>' +
              '<div class="info">' +
              '<div class="name"><a target="_blank" href="' + theURL + '">' + name + '</a></div>' +
              '<div class="desc">' + status + '</div>' +
              '</div>' +
              '</div>'
            );
          }
          else if (status != "Offline") {
            result.prepend(
              '<div class="item on">' +
              '<div class="logo"><img src="' + logo + '" alt=""></div>' +
              '<div class="info">' +
              '<div class="name live"><a target="_blank" href="' + theURL + '">' + name + '</a></div>' +
              '<div class="desc">' + status + '</div>' +
              '</div>' +
              '</div>'
            );
          }

          allBtn.addClass('active');
          mouseClickable = 1;
        });

      })
      .fail(function() {
        console.log( "error" );
      });


    }

}



$('document').ready(function(){

  users.forEach(function(item, i){
    loadAPI(i);
  });

  allBtn.on('click',function(){
    if (mouseClickable == 1) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.item.on').css('display','flex');
      $('.item.off').css('display','flex');
    }
    else {return;}
  });

  onlineBtn.on('click',function(){
    if (mouseClickable == 1) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.item.on').css('display','flex');
      $('.item.off').css('display','none');
    }
    else {return;}
  });

  offlineBtn.on('click',function(){
    if (mouseClickable == 1) {
      $(this).addClass('active').siblings().removeClass('active');
      $('.item.off').css('display','flex');
      $('.item.on').css('display','none');
    }
    else {return;}
  });


});
