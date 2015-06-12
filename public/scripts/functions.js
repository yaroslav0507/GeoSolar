Array.prototype.max = function() {
  return Math.max.apply(null, this);
};

Array.prototype.min = function() {
  return Math.min.apply(null, this);
};


function ToRad (deg) { return deg / 180 * Math.PI; }
function ToDeg (rad) { return rad / Math.PI * 180; }


function sind(deg){
	return Math.sin(deg * Math.PI/180);
}


function cosd(deg){
	return Math.cos(ToRad(deg));
}


function tand(deg){
	return Math.tan(ToRad(deg));
}


function asind(deg){
	return Math.asin(ToRad(deg));
}


function acosd(deg){
	return Math.acos(ToRad(deg));
}


function HoursMinutes(c) {
    h = Math.floor(c);
    m = Math.floor(60 * (c - h));
    return h.toFixed(0) + ":" + m.toFixed(0)
}


function DegsMinutes(c) {
    h = Math.floor(c);
    m = Math.floor(60 * (c - h)); 
    return h.toFixed(0) + "&deg; " + m.toFixed(0) + "'";
}


function Declination(day){
	return (23.45 * sind(360/365 * (284 + day)));
}


// Generate data aray suitable for building flot Graphics
function flotArray(e){
    var arr = [];
    for (var i = 0; i <= e.length - 1 ; i++) {
        arr[i] = [i, e[i]];
    };
    return arr;
}


// Convert day number to MM DD format
function dayToDate(c) {
    var dayNum = 0;
    if (31 >= c - dayNum) return "Jan " + (c - dayNum);
    dayNum += 31;
    if (28 >= c - dayNum) return "Feb " + (c - dayNum);
    dayNum += 28;
    if (31 >= c - dayNum) return "Mar " + (c - dayNum);
    dayNum += 31;
    if (30 >= c - dayNum) return "Apr " + (c - dayNum);
    dayNum += 30;
    if (31 >= c - dayNum) return "May " + (c - dayNum);
    dayNum += 31;
    if (30 >= c - dayNum) return "Jun " + (c - dayNum);
    dayNum += 30;
    if (31 >= c - dayNum) return "Jul " + (c - dayNum);
    dayNum += 31;
    if (31 >= c - dayNum) return "Aug " + (c - dayNum);
    dayNum += 31;
    if (30 >= c - dayNum) return "Sep " + (c - dayNum);
    dayNum += 30;
    if (31 >= c - dayNum) return "Oct " + (c - dayNum);
    dayNum += 31;
    if (30 >= c - dayNum) return "Nov " + (c - dayNum);
    dayNum += 30;
    if (31 >= c - dayNum) return "Dec " + (c - dayNum);
    dayNum += 31;
    return "!!"
}


// Convert date in MM DD format to day number
function dateToDay(c) {
    var dayNum = 0;
    if (c[0] == "Jan" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    if (c[0] == "Feb" && 28 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 28;
    if (c[0] == "Mar" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    if (c[0] == "Apr" && 30 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 30;
    if (c[0] == "May" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    if (c[0] == "Jun" && 30 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 30;
    if (c[0] == "Jul" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    if (c[0] == "Aug" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    if (c[0] == "Sep" && 30 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 30;
    if (c[0] == "Oct" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    if (c[0] == "Nov" && 30 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 30;
    if (c[0] == "Dec" && 31 >= c[1] - dayNum) return dayNum + c[1];
    dayNum += 31;
    //return "!!"
}

var debounce = function(fn, d){
    var t;
    return function(){
        if(t){
            clearTimeout(t);
        }

        t = setTimeout(fn, d)
    }
};

// Register new jQuery function "clickToggle"
(function($) {
    $.fn.clickToggle = function(func1, func2) {
        var funcs = [func1, func2];
        this.data('toggleclicked', 0);
        this.click(function() {
            var data = $(this).data();
            var tc = data.toggleclicked;
            $.proxy(funcs[tc], this)();
            data.toggleclicked = (tc + 1) % 2;
        });
        return this;
    };
}(jQuery));
