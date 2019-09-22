var score = 0; 
var size =4;
var grid = [];
var storeGrid = []; //Used to store the state of every block of the grid for automation purpose

$(document).ready(function(){
	
	//The grid doesnt get refreshed until we click on NEW GAME
	if(JSON.parse(sessionStorage.getItem("grid"))==null){
	document.write("<p><input id='newGame' type='submit' value='New Game' onClick='newGame()'></p>");
	}else{
		if(!isNaN(score)){
		score = parseInt(sessionStorage.getItem("score"));
		}
		grid = JSON.parse(sessionStorage.getItem("grid"));
		storeGrid = JSON.parse(sessionStorage.getItem("storeGrid"));
		gridDisplay();
	}
	
	//Movements of the grid as per the buttons pressed
	$("body").keyup(function(e){
	if(isOver()==false){
		  if(e.keyCode === 37 || e.keyCode === 49) {
			   slideLeft();
			}
			if(e.keyCode === 38 || e.keyCode === 51) {
			slideUp();
			}
			if(e.keyCode === 39 || e.keyCode === 50) {
			  slideRight();
			}
			if(e.keyCode === 40 || e.keyCode === 52) {
			  slideDown();
			}
	}
  });

});

//Creating a new game by creating new grids and filling 2 random places
function newGame(){
	grid = new Array(size);
	storeGrid = new Array(size); 
	createGrid(); 
	fillRandomPlaces();
	fillRandomPlaces();
	score = 0;
	gridDisplay();
	
}
//Create a new grid
function createGrid(){
	for (var i = 0; i < grid.length; i++) { //Depends on the size initialised
		//Initialize the arrays
		grid[i] = new Array(size);
		storeGrid[i] = new Array(size);		
	} 
	for (var i = 0; i < size; i++) { 
		for (var j = 0; j < size; j++) { 
			grid[i][j] = 0; //Fill data with zero
			storeGrid[i][j] = {history:[],up:0,down:0,right:0,left:0};//Initialize all the values
		} 
	} 
	gridDisplay();//Display
}
//Fill one random value with 2 or 4
function fillRandomPlaces(){
	var fillArray = [];//Initialize a local array
	for (var i = 0; i < size; i++) { 
		for (var j = 0; j < size; j++) { 
			if(grid[i][j]==0){
				fillArray.push({x:i,y:j});//Storing all the blocks with zero
			}
		} 
		
	}
	var rand = Math.random();//Getting a random value < 1 && > 0
	var total = fillArray.length;//Length of all zero containing blocks
	var randIndex = Math.floor(rand * total);//Getting a random Index
	var randomGrid= fillArray[randIndex];//Getting one random spot
	grid[randomGrid.x][randomGrid.y] = rand > 0.2 ? 2 : 4; //With 80% chance of 2 fill 2 or 4 on that empty spot
}
//Check if game if Won
function isOver(){
	for (var i = 0; i < size; i++) { 
		for (var j = 0; j < size; j++) { 
			if(grid[i][j]==Math.pow(2,(7+(size)))){//The winning score depends on the size of Grid
				return true;//Return true if the winning score is met
			}
		}
	}
	return false;
}
//Check if game over
function isGameOver(){
	for (var i = 0; i < size; i++) { 
		for (var j = 0; j < size; j++) { 
			if(grid[i][j]==0){
				return false;//If any block has zero return false
			}
			//If any consecutive blocks are same return false
			if(i!== (size-1) && grid[i][j] == grid[i+1][j]){
				return false;
			}
			//If any consecutive blocks are same return false
			if(j!== (size-1) &&  grid[i][j] == grid[i][j+1]){
				return false;
			}
			
		}
	}
	
	return true;
}