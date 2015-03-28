// File: interface.js
// Part of the solar application that configures
// visual output of calculated data 


App.draw = function(){
  $('#betta').html(DegsMinutes(App.betta()));

  $('#latitide').val(Client.location.lat);
  $('#longitude').val(Client.location.lng);

  var from = Client.period["start"],
      to   = Client.period["end"];

  $('#period').html( "From " + dayToDate(Client.period["start"]) + " - To " + dayToDate(Client.period["end"]) );
  $( "#slider-period" ).slider({
    values : [ from, to ]
  });

  $('#from').val(dayToDate(Client.period["start"]));
  $('#to').val(dayToDate(Client.period["end"]));

  $('.inclination .num').html(App.betta().toFixed() + "&deg;");

  $('.inclination .module_plain').css({
    'transform' : 'rotate(' + App.betta() + 'deg)'
  });

  var visualAngle = 90 - Math.abs(App.betta());
  $('#front').css({
    'transform' : 'rotateX(' + visualAngle + 'deg) rotateY(0deg) rotateZ(0deg)',
    // 'box-shadow' : '0px ' + -App.betta()/3 + 'px 3px rgba(0, 0, 0, 0.45)'
  });
  $('#side').css({
    'transform' : 'rotateZ(' + visualAngle + 'deg)'
  });

  App.renderGraph();

}

$(function() {

    // Slider of work period
    $( "#slider-period" ).slider({
      range: true,
      min: 1,
      max: 365,
      values: [ 80, 265 ],
      slide: function( event, ui ) {       
        Client.period.start = ui.values[ 0 ];
        Client.period.end = ui.values[ 1 ];
        App.draw();
      }
    });

    $( "#from" ).datepicker({
      dateFormat : "M dd",
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#to" ).datepicker({"maxDate" : selectedDate});
        var a = selectedDate.split(' ');
        var date = Array();
            date[0] = a[0];
            date[1] = parseInt(a[1]);
        var dayNum = dateToDay(date);
        Client.period.start = dayNum;
        App.draw();
      }
    });

    $( "#to" ).datepicker({
      dateFormat : "M dd",
      monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
      defaultDate: "+1w",
      changeMonth: true,
      numberOfMonths: 1,
      onClose: function( selectedDate ) {
        $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        var a = selectedDate.split(' ');
        var date = Array();
            date[0] = a[0];
            date[1] = parseInt(a[1]);
        var dayNum = dateToDay(date);
        Client.period.end = dayNum;
        App.draw();
      }
    });



    // Trigger search when 'Enter' button is hitted
    $('input#address').keydown(function(e){
      if (e.keyCode == 13){
        $('#startSearch').trigger('click');
      }
    });


    // Calculate initial scale of mobile device
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|AppleWebKit/i.test(navigator.userAgent) ) {
          var scale = window.innerWidth/640;
          viewport = document.querySelector("meta[name=viewport]");
         
          viewport.setAttribute('content', 'width=device-width, initial-scale='+scale+', user-scalable=0');
    } 

    
    // Center map on currect position when marker icon is clicked
    $('#centerPosition').on('click', function(){
      Client.location.get();
      geoApi.initialize();
      App.draw();
    });

    // Animate manual mode switcher
    $('.additional').css({top: 0, opacity: 0}).delay(1500).animate({top: 25, opacity: 1}, 'slow');

    // Switch manual mode on/off
    $('#manualMomde').clickToggle(function(){
      App.isManual = true;
      $('.crosshair').fadeToggle();
      $('#manualMomde .mode').text('Disable');
    },function(){
      App.isManual = false;
      $('.crosshair').fadeToggle();
      $('#manualMomde .mode').text('Enable');
    });


    // Redraw some page parts when window is resized
    $(window).resize(function(){
      App.renderGraph();
    })
});