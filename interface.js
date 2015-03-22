// File: interface.js
// Part of the solar application that configures
// visual output of calculated data 


$(function() {

  App.draw = function(){
    $('#betta').html(App.betta().toFixed(2) + "&deg;");
    $('#latitide').html(Math.abs(App.Lat)   + "&deg; ");
    $('#longitude').html(Math.abs(App.Lng)  + "&deg; ");
    $('#betta').html(App.betta().toFixed(2));
  }
    // Slider of work period
    $( "#slider-period" ).slider({
      range: true,
      min: 1,
      max: 365,
      values: [ 80, 265 ],
      slide: function( event, ui ) {
        $( "#amount" ).html( "From " + ui.values[ 0 ] + " - To " + ui.values[ 1 ] );
        
        Customer.period.start = ui.values[ 0 ];
        Customer.period.end = ui.values[ 1 ];

        $('#betta').html(App.betta().toFixed(2) + "&deg;");
      }
    });

    // Slider of lattitude
    $( "#slider-latitude" ).slider({ 
        min:-90, 
        max:90, 
        value: Customer.location.lat, 
        step: 1,
        slide:function(event,ui){
          App.Lat = Math.abs(ui.value);

          // Check hemispfere 
          
          if (ui.value < 0){
            Customer.hemisphere = "South";
          }
          else{
            Customer.hemisphere = "North";
          }

          $('#latitide').html(Math.abs(ui.value) + "&deg; " + Customer.hemisphere);
          $('#betta').html(App.betta().toFixed(2));
      }
    });

});