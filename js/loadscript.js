// JavaScript Document
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
  
    //add listeners for the buttons
  addButtonListeners();
  //default action when it first loads
  //showPie();
  showNumbers();
});


var values = [12, 53, 46, 67.2, 32, 5, 77];
var total = 0;
var canvas, context;
for(var i=0; i<values.length; i++){
  total += values[i];
}
//total is the sum of all the values


function setDefaultStyles(){
  //set default styles for canvas
  context.strokeStyle = "#333";	//colour of the lines
  context.lineWidth = 3;
  context.font = "bold 16pt Arial";
  context.fillStyle = "#900";	//colour of the text
  context.textAlign = "left";
}

function showNumbers(){
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  var xpos = 40;
  var ypos = 40;
  context.fillText( "Values", xpos, ypos);
  //1. write out the numbers
  for(var i=0; i<values.length; i++){
    ypos += 40;
    context.fillText( values[i].toString(), xpos, ypos);
  }
  //2. write out the total
  ypos += 40;
  context.fillText( total + " - total", xpos, ypos);
  
  //3. write out percentage of the total for each number
  ypos = 40;
  xpos += 250;
  context.fillText( "Percentage of total", xpos, ypos);
  for(var i=0; i<values.length; i++){
    ypos += 40;
    var pct = (parseInt(values[i] / total * 10000))/100;
    context.fillText( pct.toString(), xpos, ypos);
  }
  
  
  
}

function showLines(){
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  var numPoints = values.length;	//how many points to draw on the line.
  var offsetX = 30;	//space away from left edge of canvas to start drawing.
  var offsetY = 300;	//bottom edge of the graph
  var spaceBetweenPoints = ((canvas.width - offsetX)/numPoints);
  //how far apart to make each x value.
  var graphHeight = 300;
  //use the percentage to calculate the height of the next point on the line
  //values[0] is the moveTo point.
  //values[1] is the first lineTo point.
  var x = 0 + offsetX;
  var y = offsetY - (graphHeight * (values[0]/total));
  context.moveTo(x, y);
  context.beginPath();
  for(var i=0; i<values.length; i++){
    var pct = values[i] / total;
    y = offsetY - (graphHeight * (values[i]/total));
    context.lineTo(x, y);
    //for the first point the moveTo and lineTo values are the same
    //to add labels take the same x position but go up or down 30 away from the y value
    //use the percentage to decide whether to go up or down. 20% or higher write below the line
    var lbl = Math.round(pct * 100).toString();
    if(pct <= .2){
      context.fillText(lbl, x, y - 30);
    }else{
      context.fillText(lbl, x, y + 30);
    }
    x = x + spaceBetweenPoints;	//move the x value for the next point
  }
  context.stroke();
  //now draw the x and y lines for the chart
  context.strokeStyle = "#999";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(offsetX, canvas.height-graphHeight);
  context.lineTo(offsetX, graphHeight);
  context.lineTo(canvas.width-offsetX, graphHeight);
  context.stroke();  
}

function showBars(){
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  //the percentage of each value will be used to determine the height of the bars.
  var graphHeight = 300;    //bottom edge of the graph
  var offsetX = 30;	//space away from left edge of canvas to start drawing.
  var barWidth = 30;	//width of each bar in the graph
  var spaceBetweenPoints = 20; //how far apart to make each x value.
  //start at values[1].
  //values[0] is the moveTo point.
  var x = offsetX + 20;	//left edge of first rectangle
  //var y = offsetY - (graphHeight * (values[0]/100));
  //start a new path
  context.beginPath();
  for(var i=0; i<values.length; i++){
    var pct = values[i] / total;
    var barHeight = (graphHeight * pct);
    //(x, y) coordinates for a rectangle are the top, left values unless you do negative values for w, h
    context.rect(x, graphHeight-1, barWidth, -1 * barHeight);
    //for the first point the moveTo and lineTo values are the same
    //All the labels for the bars are going above the bars
    var lbl = Math.round(pct * 100).toString();
    context.fillText(lbl, x, graphHeight - barHeight - 30-1);
    x = x + barWidth + spaceBetweenPoints;	
    //move the x value for the next point
  }
  
  context.stroke();	//draw lines around bars
  context.fill(); 	//fill colours inside the bars
  
  context.strokeStyle = "#999";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(offsetX, canvas.height-graphHeight);
  context.lineTo(offsetX, graphHeight);
  context.lineTo(canvas.width-offsetX, graphHeight);
  context.stroke();  
}

function showCircles(){
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  var numPoints = values.length;	//number of circles to draw.
  var padding = 15;	//space away from left edge of canvas to start drawing.
  var magnifier = 15;	
  var horizontalAxis = canvas.height/2;   //how far apart to make each x value.
  //use the percentage to calculate the height of the next point on the line
  //start at values[1].
  //values[0] is the moveTo point.
  var currentPoint = 0;	//this will become the center of each cirlce.
  var x = 0;
  var y = horizontalAxis;//center y point for circle
  var colour = "#00FF00";
  for(var i=0; i<values.length; i++){
    //the percentages will be used to create the area of the circles
    //using the radius creates way too big a range in the size
    var pct = Math.round((values[i] / total) * 100);
    // the fill colour will be a shade of yellow
    // For shades of yellow the Reds should be E0 - FF, 
    // Greens should be less C0 - D0
    // blues are based on the percentage
    var a = (0xD0 + Math.round(Math.random() * 0x2F));
    var b = (0xD0 + Math.round(Math.random() * 0x2F));
    var red = Math.max(a, b).toString(16);
    var green = Math.min(a, b).toString(16);
    var blue = ( Math.floor(pct * 2.55) ).toString(16); 
    if(red.length==1)red= "0" + red;
    if(green.length==1)green= "0" + green;
    if(blue.length==1)blue="0"+blue;
    colour = "#" + red + green + blue;
    // area = Math.PI * radius * radius
    // radius = Math.sqrt( area / Math.PI );
    var radius = Math.sqrt(pct / Math.PI ) * magnifier; 
    // magnifier makes all circles bigger
    x = currentPoint + padding + radius;
    //center x point for circle
    //draw the circle
    context.beginPath();
    context.fillStyle = colour;	
    //colour inside the circle set AFTER beginPath() BEFORE fill()
    context.strokeStyle = "#333";	//colour of the lines 
    context.lineWidth = 3;
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();	//fill comes before stroke
    context.stroke();
    //to add labels take the same x position but go up or down 30 away from the y value
    //use the percentage to decide whether to go up or down. 20% or higher write below the line		
    var lbl = pct.toString();
    context.font = "normal 12pt Arial";
    context.textAlign = "center";
    context.fillStyle = "#000000";	//colour inside the circle
    context.beginPath();
    context.fillText(lbl, x, y+6);
    context.closePath();
    currentPoint = x + radius;	
    //move the x value to the end of the circle for the next point  
  }
}

function showSquares(){
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  var numPoints = values.length;	//number of squares to draw.
	var padding = 10;				//space between each square
	var start = padding;			
	//this is the left edge of the first square
	var y = 10;
	var colour = "#00FF00";
	context.fillStyle = colour;			//colour inside the square
	context.strokeStyle = "#333";		//colour of the lines 
	context.lineWidth = 1;
	var renderingArea = canvas.width - 20 - (padding *numPoints);
	//total space on the canvas to be used for the squares
	
	for(var i=0; i<values.length; i++){
		var pct = (values[i] / total);
		var side = renderingArea * pct;
		context.save();  //save the current orientation of the canvas
		context.beginPath();
		var angle = pct * (Math.PI / 2);
		context.translate(start, 10);
		context.rotate(angle);
		
		context.rect(0, 0, side, side);
		context.fill();
		context.stroke();
		context.restore();
     // console.log( start );
		start = start + side + padding;
		y = y + (100 * pct);
	}
}

function showPie(){
  //clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);
  //set the styles in case others have been set
  setDefaultStyles();
  var cx = canvas.width/2;
  var cy = canvas.height/2;
  var radius = 100;
  var currentAngle = 0;
  //the difference for each wedge in the pie is arc along the circumference
  //we use the percentage to determine what percentage of the whole circle
  //the full circle is 2 * Math.PI radians long.
  //start at zero and travelling clockwise around the circle
  //start the center for each pie wedge
  //then draw a straight line out along the radius at the correct angle
  //then draw an arc from the current point along the circumference
  //stopping at the end of the percentage of the circumference
  //finally going back to the center point.
  for(var i=0; i<values.length; i++){
    var pct = values[i]/total;
    //create colour 0 - 16777216 (2 ^ 24) based on the percentage
    var intColour = parseInt(pct * 16777216);
    //console.log(intColour);
    var red = ((intColour >> 16) & 255);
    var green = ((intColour >> 8) & 255);
    var blue = (intColour & 255);
    //console.log(red, green, blue);
    var colour = "rgb(" + red +"," + green+"," + blue+")";
    //console.log(colour);
    var endAngle = currentAngle + (pct * (Math.PI * 2));
    //draw the arc
    context.moveTo(cx, cy);
    context.beginPath();
    context.fillStyle = colour;
    context.arc(cx, cy, radius, currentAngle, endAngle, false);  
    context.lineTo(cx, cy);
    context.fill();
    //Now draw the lines that will point to the values
    context.save();
    context.translate(cx, cy);//make the middle of the circle the (0,0) point
    context.strokeStyle = "#0CF";
    context.lineWidth = 1;
    context.beginPath();
    //angle to be used for the lines
    var midAngle = (currentAngle + endAngle)/2;//middle of two angles
    context.moveTo(0,0);//this value is to start at the middle of the circle
    //to start further out...
    var dx = Math.cos(midAngle) * (0.5 * radius);
    var dy = Math.sin(midAngle) * (0.5 * radius);
    context.moveTo(dx, dy);
    //ending points for the lines
    var dx = Math.cos(midAngle) * (radius + 30); //30px beyond radius
    var dy = Math.sin(midAngle) * (radius + 30);
    context.lineTo(dx, dy);
    context.stroke();
    //put the canvas back to the original position
    context.restore();
    //update the currentAngle
    currentAngle = endAngle;
  }
}

function addButtonListeners(){
  document.querySelector("#btnPie").addEventListener("click", showPie);
}