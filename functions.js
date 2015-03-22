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


function Declination(day){
	return (23.45 * sind(360/365 * (284 + day)));
}


//Console Log functions
function logDaytime(){
	for (var i = 1; i <= 24; i++) {
		Customer.LST = i;
		if (App.alpha() < 0) {
			var daytime = "night";
		}
		else var daytime = "day";
		var hs = 1/15 * acosd(-tand(LL) * tand(App.decl()));

		console.log("Time: ", i, " Alpha: ", App.alpha(), " ", daytime, "Hs :", hs);
	};
}


function Betta(startDay, endDay){
	var arr1 = 		[];

	for (var i = 0; i <= endDay - startDay; i++){
		arr1[i] = Declination(i + startDay); 
	};

	var minDecl = 	arr1.min(),
		maxDecl = 	arr1.max();

	console.log("Min dec: ", minDecl);
	console.log("Max dec: ", maxDecl);

	var decl = Math.acos(0.5 * (cosd(minDecl) + cosd(maxDecl)));

	console.log("Decl :", ToDeg(decl));

	var bet = LL - ToDeg(decl);

	console.log("Betta: ", bet);
}

function init(){
	//App.betta();
}