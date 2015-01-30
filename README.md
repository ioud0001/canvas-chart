# canvas-chart
# Semester 2: Assignment 2: Pie Charts and Infographics
## Author: Anna Ioudovskaya 
###Description:  
This project was created to demonstrate the use of the CANVAS tag in HTML5.  

### Instructions: 
####Global variables: 
* We create a variable that will store the JSON data
* We create a variable that will store the total percents, which we want calculated and displayed on the canvas
* We create a variable for the pie chart canvas, and for the canvas context and repeat for the other graph 
* For the purposes of the assignment we need to know which value is the largest and which value is the smallest, so we created 
an oldValue and newValue also, to compare them against each other and determine which is larger.
* We need to reference these elements in various parts of the application so I decided it is better to create these globally instead of duplicating.
####Loading webpage content: 
* In the **DOMContentLoaded** we are creating the script element and setting it to the latest JavaScript minified version
* We are selecting both canvas elements according to their id's 
* We are setting the context for each canvas element
* We are calling the ajax function, which contains all of the JSON data (the JSON data must be in the same location as the javascript)

####Error handling: 
For now, it simply tells the user that something is broken, but this could be modified to display more information.

####When ajax() is loaded
* this function goes through each value in the ajax data and determines which value is the largest and which is the smallest 
* this function will also add up all of the values and produce a total, which is needed for the purposes of the assignment 

####Calling two functions: 
* the **first function** will show a pie chart through various complex trig statements to determine the radius of each section of the pie chart. It will display labels appropriately. 
* the **second function** will show a plotter diagram, where each radius of the plot is determined by the percentage of sales. The opacity of each circle differs depending on the perentage and there's a label for each item.

