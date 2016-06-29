$(document).ready(function(){
  var latitude, longitude;
  var prefix = "wi-owm-";
  
  if(navigator.geolocation){       
    navigator.geolocation.getCurrentPosition(function(position){
      latitude = position.coords.latitude;
      longitude = position.coords.longitude; 
      var url = "https://crossorigin.me/http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=adca06bc297c465fa3783238335eb81e&units=imperial";  
      $.getJSON(url, function(data){
        $("#location").html(data.name + ", " + data.sys.country);
        $("i").html("  " + Math.floor(data.main.temp) + "&deg");
        $("#celsius").on("click", function(){
          $("i").html("  " + Math.floor((data.main.temp - 32) * (5 / 9)) + "&deg");
        });
        $("#fahrenheit").on("click", function(){
          $("i").html("  " + Math.floor(data.main.temp) + "&deg");
        }); 
        var timeOfDay = "";
        if(data.dt > data.sys.sunrise && data.dt < data.sys.sunset){
          timeOfDay = "day-"
        }else{
          timeOfDay = "night-"
        }
        $("i").addClass(prefix + timeOfDay + data.weather[0].id);
      }); 
	  });
  }else{
  	alert("Geolocation services are not supported by your web browser.");
  }     	
});