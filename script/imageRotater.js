




var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

$(document).ready(function(){
	$(".landing").mousemove(function( event ) {
		
		//console.log("inner width and height:" + windowWidth + " " + windowHeight);
		
		var mouseXPercent = Math.round(((event.pageX) / (windowWidth)) * 100);
		var mouseYPercent =  Math.round(((event.pageY) / (windowHeight)) * 100);
		
		var xChangePercent = (mouseXPercent - 50);  //Distance from the center as a percentage of the page. (0 - 100)
		var yChangePercent = (mouseYPercent - 50);
		
		xChange = (xChangePercent/1.2).toFixed(2);  //Makes the rotation less violent
		yChange = (yChangePercent/1.2).toFixed(2);
		
		var shadowSize = 40;
		xShadow = Math.round(shadowSize * (xChangePercent/100));  //Calculate size of shadow.
		yShadow = Math.round(shadowSize * (yChangePercent/100));
		
		xShadow = -xShadow;  //Shadows should be showing up on the opposite end of where the mouse is.
		yShadow = -yShadow;  
		
		//Debugging stuff
		//$("p").text(mouseXPercent + "," + mouseYPercent + ": " + "transform" + "rotateX(" + xChange + "deg) rotateY(" + yChange +  "deg)");
		
		$(".top-image-box").css("transform", "rotateY(" + xChange + "deg) rotateX(" + yChange +  "deg)");
		$(".top-image-box").css("box-shadow", xShadow + "px " + yShadow + "px " + shadowSize + "px 5px");
		
		//box-shadow: 4px -8px 39px 0px
		//$(".top-image-box").css("transform", "rotate3d(" + xChange + "," + yChange +  ",0, 60deg)");
		
		
		//console.log("at " + mouseXPercent + "," + mouseYPercent);
	});
});