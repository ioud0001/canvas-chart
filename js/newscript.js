// JavaScript Document
var data; // global ajax values stored in data 
var total = 0; // total is the sum of all the json segment values 
var pieChart, pcContext; // first canvas and context 
var smokeChart, blotchContext; // second canvas and context 

 
// global values store the largest and smallest values by comparing newValue to oldValue
var newValue = 0;
var oldValue = 0; 
var largest = 0; 
var smallest = 0;


document.addEventListener("DOMContentLoaded", function () {
    //using an anonymous function to avoid conflicts
    var s = document.createElement("script");
    s.setAttribute("src", "http://code.jquery.com/jquery-2.1.0.min.js");
	document.querySelector("head").appendChild(s); 
	pieChart = document.querySelector("#pcCanvas");
	smokeChart = document.querySelector("#blotchCanvas");
	pcContext = pieChart.getContext("2d");
	blotchContext = smokeChart.getContext("2d"); 
	ajax(); 
	
	  
});


function ajax(){
	$.ajax({
     url : "js/cheese.json",
     dataType :"json",
     type: "get",
	 jsonp: false
	 }).done( loadJS ).fail(errors);

}
function loadJS(jsonData){
	data=jsonData;
for(var i=0; i<data.segments.length; i++){
  		newValue = data.segments[i].value; 
  		// compare old and new values and declare smallest and largest
  		// the first value is both small and large; it is the starting value in JSON file 
  		if (largest == 0 && smallest == 0)
			smallest = largest = newValue;
  		if (newValue > largest)
  			largest = newValue; 
		// go through the following conditions 
		// if the new value is less than the largest number
		if (newValue < largest){
			// set the value if none exists
				if (smallest == 0)
					smallest = newValue; 
				// if the new value is less than the current smallest number, set it 
				if (newValue < smallest)
					smallest = newValue;
		}
	
	// the new value is sent to old value
	// now both values can be compared at the beginning of the loop
	oldValue = newValue;   

  total += data.segments[i].value; // add the total 
}
	showPie(data);
	blotches(data);
}

function errors(jqxhr, status, err){
	console.log("something is broken!");
}


 
function showPie(data){
  //clear the canvas 
  pcContext.clearRect(0, 0, pieChart.width, pieChart.height);
  var cx = pieChart.width/2;
  var cy = pieChart.height/2;
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
  pcContext.font = "oblique 12px Arial, sans-serif"; 
  for(var i=0; i<data.segments.length; i++){
    var pct = data.segments[i].value/total;

    var colour = data.segments[i].color;
    var endAngle = currentAngle + (pct * (Math.PI * 2));
    //draw the arc
    pcContext.moveTo(cx, cy);
    pcContext.beginPath();
    pcContext.fillStyle = colour;
	
	// change the radius depending on the global largest and smallest
	if (data.segments[i].value == largest)
		radius *= 1.1; 
	else if (data.segments[i].value == smallest)
		radius *= 0.9; 
	else
		radius = 100;
    pcContext.arc(cx, cy, radius, currentAngle, endAngle, false);  
    pcContext.lineTo(cx, cy);
	
    pcContext.fill();
    //Now draw the lines that will point to the data.segments
    pcContext.save();
    pcContext.translate(cx, cy);//make the middle of the circle the (0,0) point
    pcContext.strokeStyle = "#dc8";
    pcContext.lineWidth = 3;
    pcContext.beginPath();
    //angle to be used for the lines
    var midAngle = (currentAngle + endAngle)/2;//middle of two angles
    pcContext.moveTo(0,0);//this value is to start at the middle of the circle
    //to start further out...
    var dx = Math.cos(midAngle) * (0.5 * radius);
    var dy = Math.sin(midAngle) * (0.5 * radius);
    pcContext.moveTo(dx, dy);
    //ending points for the lines
    var dx = Math.cos(midAngle) * (radius + 30); //30px beyond radius
    var dy = Math.sin(midAngle) * (radius + 30);
    pcContext.lineTo(dx, dy);
	var eachvalue = data.segments[i].value;
	pct = (parseInt(eachvalue / total * 10000))/100;
	//add the labels 
	var label = data.segments[i].label.toString() + " (" + Math.round(pct) + "%)";
	pcContext.fillStyle = "#ab2ab3"; // text colour
	
	pcContext.fillText(label, (Math.cos(midAngle) * (radius + 40)) - 25, Math.sin(midAngle) * (radius + 50));
	pcContext.stroke();
    //put the blotchCanvas back to the original position
    pcContext.restore();
    //update the currentAngle
    currentAngle = endAngle;
  }
}

// the following function will display "blotches" on the canvas area
// some things to note: the zeroth Y axis for my canvas grid at 200px 
// this means that the y for all blotches must be under 200px 
// if blotch y coordinate is over 200px, it will display below the line we created 
function blotches(data){
 //clear the blotchCanvas
  blotchContext.clearRect(0, 0, blotchCanvas.width, blotchCanvas.height);
  //set the styles in case others have been set
  //setDefaultStyles();
  var numPoints = data.segments.length;	//number of circles to draw.
  var padding = Math.round(blotchCanvas.width / 2 / numPoints);	//calculate the distance dots on the grid
  // the grid line is equal to the canvas height, divided by two 
  var canvasY = blotchCanvas.height / 2;	
  var currentPoint = 0;//this will become the center of each cirlce.
  
  var colour; 
  
  // create a line in the middle of the grid for readability 
  // x is 0 and y is canvas.height / 2 
  blotchContext.font = "normal 16pt Arial";
  blotchContext.beginPath();
  blotchContext.fillText("Cheese Sales:", 0, 50);
  
  blotchContext.moveTo(0, canvasY); 
  blotchContext.lineTo(blotchCanvas.width, canvasY);
  blotchContext.stroke();
  blotchContext.closePath();
  blotchContext.font = "normal 12pt Arial";
  blotchContext.beginPath();
        blotchContext.lineWidth = 1;
        // Fill the path
  blotchContext.closePath();
  
  var labelY; // used for the label
  var alpha; // used for the opacity 
  for(var i=0; i<data.segments.length; i++){
    //the percentages will be used to create the area of the circles
    var pct = Math.round((data.segments[i].value / total) * 100);
    var radius = Math.sqrt(pct / Math.PI ) *  8;

    //center x point for circle
    //draw the circle
	// the blotch point is equal to half the height of canvas and the pct value
	// we want the blotch point higher than the 200 line
	var blotchPointY = blotchCanvas.height / 2 - pct; 
	 colour = data.segments[i].color;
	// create a safe distance between each current point
    currentPoint += pct + padding;

	
	alpha = pct * 0.05;
	
	
	if (alpha <= smallest * 0.05)
		alpha = 0.4;
	console.log(alpha);
	console.log(smallest);
	colour =  data.segments[i].color;

	blotchContext.beginPath();
	blotchContext.globalAlpha = alpha;
	
    blotchContext.fillStyle = colour;	

    if (data.segments[i].value == smallest)
		blotchContext.lineWidth = 0;
	else if (data.segments[i].value == largest)
		blotchContext.lineWidth = 8;
	else
		blotchContext.lineWidth = 3;
	blotchContext.arc(currentPoint, blotchPointY - radius, radius, 0, Math.PI * 2, false);	
    blotchContext.closePath();
    blotchContext.fill();	//fill comes before stroke
    blotchContext.stroke();
    
	var label = data.segments[i].label; // cheese type 
    var lbl = pct.toString(); // percentage
    blotchContext.font = "normal 10pt Arial";
    blotchContext.textAlign = "center";
    blotchContext.fillStyle = "black";	//label colours
    blotchContext.beginPath();
	
	// labels
	if (i % 2 == 0)
		 labelY = blotchCanvas.height / 2 + 40;
	else 
		labelY = blotchCanvas.height / 2 - Math.ceil((radius + pct *3));  
	// display each label after 200 px 
	blotchContext.fillText(label, currentPoint, labelY);
	blotchContext.fillText(lbl, currentPoint, labelY + 15);
	
    blotchContext.closePath();  
  }
  
}

