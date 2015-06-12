// File: app.js
// Part of the solar application
// application logic based on Object Model



// Client Object - contains information about
// geolocation, solar station work period, GMT

var Client = {
	location : {
		lat : 50.3630,
		lng : 30.6012,
		avialable : "",

		// A method to get client position via HTML5 

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
}

// App object - contains math logic of the application

var App = {

	// Get the work period declination array 
	// for further calculation of min and max declination

	decl : function(){

		var decPerDay =  Array();
		var startDay = 	Client.period.start,
			endDay = 	Client.period.end;

		for (var i = 0; i <= endDay - startDay; i++){
			decPerDay[i] = Declination(i + startDay);
			//decPerDay[i] < 0 ? decPerDay[i] = 0 : " ";
		};

		return decPerDay;
	},
	
	// Calculate the most suitable angle of PV cell

	betta: function(){

		var minDecl = this.decl().min(),
			maxDecl = this.decl().max();

		//var decl 	= Math.acos(0.5 * (cosd(minDecl) + cosd(maxDecl)));
		var dec2 	= (minDecl + maxDecl)/2;

		bet = Client.location.lat - dec2;
		return bet;
	},

	// Render graphics of daily declination

	renderGraph: function(){

		var dataset = flotArray(App.decl());

		$.plot("#plot",[{
			data: dataset,
			lines: { 
				show: true, 
				fill: true,
			},
			
		}]);
	},

	isManual: true,
}

// geoApi object - for manipulations with location data and map canvas

var geoApi = {

	initialize: function(){

		Client.location.get();

		// Print initial information when client position is known

		App.draw();

		// Toggle autocompleete feature when document is ready

		var input = document.getElementById('address');	
		var autocomplete = new google.maps.places.Autocomplete(input);

		// Create a coordinates for google map

	    var geoLatlng = new google.maps.LatLng(lat, lng);
	    var geoOptions = {
	        zoom: Client.location.avialable ? 6 : 4,
	        center: geoLatlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP,
	    }

	    // Initialize new google map canvas

		map = new google.maps.Map(document.getElementById("map_canvas"), geoOptions);

		var getCenter = debounce(function(){
			var center = map.getCenter();
			$('.crosshair_coords').text(center);

			Client.location.lat = center["A"].toFixed(4);
			Client.location.lng = center["F"].toFixed(4);

			App.draw();
		}, 100);

		google.maps.event.addListener(map, 'center_changed', function() {
			if (App.isManual) {
				getCenter();
		   	};
		});
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
		    		var marker = {};
					var marker = new google.maps.Marker({
						map : map,
						position : res.results[0].geometry.location,
						animation: google.maps.Animation.DROP
					});
					Client.location.lat = res.results[0].geometry.location.lat;
					Client.location.lng = res.results[0].geometry.location.lng;

					App.draw();
		    	}
		    });
		});
	},
};

var map,
	lat = Client.location.lat,
	lng = Client.location.lng;

var geocoder = new google.maps.Geocoder();

google.maps.event.addDomListener(window, "load", geoApi.initialize);