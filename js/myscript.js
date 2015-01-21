
// JavaScript Document
 
document.addEventListener("DOMContentLoaded", function(){
	 //set global vars for canvas and context
	 var canvas1 = document.querySelector("#canvas1");
	 var context1 = canvas1.getContext("2d");
	 var canvas2 = document.querySelector("#canvas2");
	 var context2 = canvas1.getContext("2d");
	 //default action when it first loads
	buildWidget(); 

});

function buildWidget(){
		 var xhr = $.ajax({
     url : "js/cheese.json",
     dataType :"json",
     type: "GET",
	 xhrFields: {
      	withCredentials: true
	 }}).done( function( allcheeses ){  
         // this function will run if the AJAX call is successful
         //console.log( xhr.responseText );  //this is the text inside the returned file
         //console.log( data ); //this is the returned data, basically same as xhr.responseText
         //var dataV2 = jQuery.parseJSON( xhr.responseText ); //exactly the same as data
		 var parsedData = JSON.stringify(xhr.responseText);
		 
		 loadJS(parsedData); 
     });
}
function loadJS(allcheeses){
	var allcheese = allcheeses.segments.length; 
	console.log("it works");
}


	 
/*
function gotData( data ){
	console.log("Made it here!");
}

function badStuff(){
	console.log("you lose");
}
/* 
function buildWidget() {
	
	parseFromJS();
}

var loadCount = function () {
    currentFileCount++;    
    if(currentFileCount === requiredFileCount){
        buildWidget();
		
    }
}

document.addEventListener("DOMContentLoaded", function () {
	var css = document.createElement("link");
    css.setAttribute("rel", "stylesheet");
    css.addEventListener("load", loadCount);
    var s = document.createElement("script");
    s.addEventListener("load", loadCount);
  	css.setAttribute("href", "css/main.css");
    s.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");
    document.querySelector("head").appendChild(css);
	document.querySelector("head").appendChild(s);  
	canvas = document.querySelector("#myCanvas");
	context = canvas.getContext("2d"); 
	
	var data = data.segments.length;
	var curItem = 0;
	
	
	if (curItem < cheese.segments.length){
		document.getElementById("myCanvas").innerHTML += data.segments[curItem].color; 
	}
 
});
*/