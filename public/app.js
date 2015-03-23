// File: app.js
// Part of the solar application
// application logic based on Object Model



// Customer Object - contains information about
// geolocation, solar station work period, GMT

var Customer = {
	location : {
		lat : 48.379433,
		lng : 31.16558
	},
	period: {
		start: 80,
		end:   265
	},
	// LST : 15,
	// N 	: 80,
	// GMT	: function(){
	// 	return Math.floor(Customer.location.lng / 15);
	// },
	// DS  : function(){
	// 	if (Customer.N < 90 && Customer.N < 300)
	// 		return 1 ;	
	// 	else 
	// 		return 0;
	// },
	// "hemisphere" : "",
}

// App object - contains calculations logics of the app

var App = {

	"Lat" :	Customer.location.lat,
	"Lng" : Customer.location.lng,

	// Declination of the Sun
	//"decl" : Declination(Customer.N),

	// True solar time
	// TST  : function(){
	// 	return Customer.LST + (this.Lat - 15 * Customer.GMT())/15 - Customer.DS();
	// },

	// // Hour angle
	// h 	 : function(){
	// 	return 15 * (this.TST() - 12);
	// },

	// alpha: function(){
	// 	return ToDeg(sind(this.Lat) * sind(this["decl"]) + cosd(this.Lat) * cosd(this["decl"]) * cosd( this.h()));
	// },

	// Optimal angle of a solar panel
	betta: function(){

		//Array for further calculation of min and max declination
		var arr1 = 		[],
			startDay = 	Customer.period.start,
			endDay = 	Customer.period.end;

		for (var i = 0; i <= endDay - startDay; i++){
			arr1[i] = Declination(i + startDay); 
		};

		var minDecl = arr1.min(),
			maxDecl = arr1.max();

		var decl 	= Math.acos(0.5 * (cosd(minDecl) + cosd(maxDecl)));

		bet = this.Lat - ToDeg(decl);

		return Math.abs(bet);
	}

}

// Toggle autocompleete feature when document is ready
$(function(){
	var input = document.getElementById('address');	
	var autocomplete = new google.maps.places.Autocomplete(input);
	App.draw();
	geoApi.initialize();
});	

var geoApi = {};

var map;
var lat = Customer.location.lat,
	lng = Customer.location.lng;

var geocoder = new google.maps.Geocoder();

geoApi.initialize = function(){
	// Creation of a coordinates for google map
    var geoLatlng = new google.maps.LatLng(lat, lng);
    var geoOptions = {
        zoom: 6,
        center: geoLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    // Initializing new google map canvas
	map = new google.maps.Map(document.getElementById("map_canvas"), geoOptions);
    
    // Placing a start marker to the initialized map
	//  var marker = new google.maps.Marker({
	// 	map : map,
	// 	position : geoLatlng
	// });
}

geoApi.geocode = function(){
	var address = $('#address').val();
	geocoder.geocode({
		"address" : address
	},
	function(results, status){
		$.ajax({
	    	url: 	"http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
	    	type: 	"POST",
	    	success:function(res){
	    		map.setCenter(res.results[0].geometry.location);
	    		map.setZoom(14)
				var marker = new google.maps.Marker({
					map : map,
					position : res.results[0].geometry.location
				});
				App.Lat = res.results[0].geometry.location.lat;
				App.Lng = res.results[0].geometry.location.lng;

				App.draw();
	    	}
	    });
	});
}

google.maps.event.addDomListener(window, "load", geoApi.initialize);