// File: interface.js
// Part of the solar application that configures
// visual output of calculated data 


App.draw = function(){
  $('#betta').html(DegsMinutes(App.betta()));

  $('#latitide').val(Math.abs(App.Lat));
  $('#longitude').val(Math.abs(App.Lng));

  var from = Customer.period["start"],
      to   = Customer.period["end"];

  $('#period').html( "From " + dayToDate(Customer.period["start"]) + " - To " + dayToDate(Customer.period["end"]) );
  $( "#slider-period" ).slider({
    values : [ from, to ]
  });

  $('#from').val(dayToDate(Customer.period["start"]));
  $('#to').val(dayToDate(Customer.period["end"]));

  $('.inclination .num').html(App.betta().toFixed() + "&deg;");

  $('.inclination .module_plain').css({
    'transform' : 'rotate(' + App.betta() + 'deg)'
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
        Customer.period.start = ui.values[ 0 ];
        Customer.period.end = ui.values[ 1 ];
        App.draw();
      }
    });

    // $('.date').datepicker({
    //   dateFormat : "M dd",
    //   monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec" ],
    //   defaultDate: "+1w",
    //   changeMonth: true,
    //   numberOfMonths: 2,
    // });

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
        Customer.period.start = dayNum;
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
        Customer.period.end = dayNum;
        App.draw();
      }
    });

    $('.content').height($('.sidebar').height());

    $(window).resize(function(){
      $('.content').height($('.sidebar').height());
      App.renderGraph();
    })
});