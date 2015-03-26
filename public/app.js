// File: app.js
// Part of the solar application
// application logic based on Object Model



// Client Object - contains information about
// geolocation, solar station work period, GMT

var Client = {
	location : {
		lat : 37.09024,
		lng : -95.712891,
		avialable : "",
		hack: function(){
			// here will be a script of clients IP grab and getting an information about position by it.
		},
		get: function(){
			var options = {
				enableHightAccuracy: true,
				timeout: 5000,
			};

			function success(pos){
				var crd = pos.coords;

				Client.location.lat = crd.latitude;
				Client.location.lng = crd.longitude;
				App.draw();

				console.log('lat: ', crd.latitude, 'lng: ', crd.longitude);
				Client.location.avialable = true;
				
			}

			function error(err){
				console.warn('ERROR('+ err.code + '): ' + err.message);
				Client.location.avialable = false;
			};

			navigator.geolocation.getCurrentPosition(success, error, options);
			
		},
	},
	period: {
		start: 80,
		end:   265
	},
	// LST : 15,
	// N 	: 80,
	// GMT	: function(){
	// 	return Math.floor(Client.location.lng / 15);
	// },
	// DS  : function(){
	// 	if (Client.N < 90 && Client.N < 300)
	// 		return 1 ;	
	// 	else 
	// 		return 0;
	// },
	// "hemisphere" : "",
}

// App object - contains math logic of the application
// var switcher = true;

var App = {

	// Declination of the Sun
	//"decl" : Declination(Client.N),

	// True solar time
	// TST  : function(){
	// 	return Client.LST + (this.Lat - 15 * Client.GMT())/15 - Client.DS();
	// },

	// // Hour angle
	// h 	 : function(){
	// 	return 15 * (this.TST() - 12);
	// },

	// alpha: function(){
	// 	return ToDeg(sind(this.Lat) * sind(this["decl"]) + cosd(this.Lat) * cosd(this["decl"]) * cosd( this.h()));
	// },

	// Optimal angle of a solar panel
	decl : function(){
		//Array for further calculation of min and max declination
		var decPerDay =  Array();
		var startDay = 	Client.period.start,
			endDay = 	Client.period.end;
		for (var i = 0; i <= endDay - startDay; i++){
			decPerDay[i] = Declination(i + startDay); 
			// if (switcher) {
				decPerDay[i] < 0 ? decPerDay[i] = 0 : " ";
			// };
		};
		return decPerDay;
	},
	
	betta: function(){

		var minDecl = this.decl().min(),
			maxDecl = this.decl().max();
		// (minDecl < 0) ? minDecl = 0 : " ";

		var decl 	= Math.acos(0.5 * (cosd(minDecl) + cosd(maxDecl)));

		bet = Client.location.lat - ToDeg(decl);

		return bet;
	},

	renderGraph: function(){
		var dataset = flotArray(App.decl());
		$.plot("#plot",[{
			data: flotArray(App.decl()),
			lines: { 
				show: true, 
				fill: true,
				//fillColor: 'rgba(51, 122, 183, 0.2);',
			},
			
		}]);
	}

}

var geoApi = {

	initialize: function(){

		Client.location.get();
		// Print initial information when client position is known
		App.draw();

		// Toggle autocompleete feature when document is ready
		var input = document.getElementById('address');	
		var autocomplete = new google.maps.places.Autocomplete(input);

		// Creation of a coordinates for google map
	    var geoLatlng = new google.maps.LatLng(lat, lng);
	    var geoOptions = {
	        zoom: Client.location.avialable ? 6 : 4,
	        center: geoLatlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    }
	    // Initializing new google map canvas
		map = new google.maps.Map(document.getElementById("map_canvas"), geoOptions);
	   
	},

	geocode: function(){
		var address = $('#address').val();
		geocoder.geocode({
			"address" : address
		},
		function(results, status){
			$.ajax({
		    	url: 	"http://maps.googleapis.com/maps/api/geocode/json?address="+address+"&sensor=false",
		    	type: 	"POST",
		    	success: function(res){
		    		map.setCenter(res.results[0].geometry.location);
		    		map.setZoom(14)
					var marker = new google.maps.Marker({
						map : map,
						position : res.results[0].geometry.location
					});
					Client.location.lat = res.results[0].geometry.location.lat;
					Client.location.lng = res.results[0].geometry.location.lng;

					App.draw();
		    	}
		    });
		});
	}


};

var map;
var lat = Client.location.lat,
	lng = Client.location.lng;

var geocoder = new google.maps.Geocoder();

google.maps.event.addDomListener(window, "load", geoApi.initialize);