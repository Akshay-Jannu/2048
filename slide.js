//Passing individual coloumns as a array and  reversing them shifting left and reversing back and then placing them back as coloumn
function slideDown(){
	var newArray = grid.map(function(arr) {
		return arr.slice();
	});
	for (var i=0; i<size; i++) { 
		var coloumn = new Array(size);
		for (var j = 0; j < size; j++) { 
			coloumn.push(grid[j][i]);
		}
		coloumn=coloumn.reverse();
		coloumn=slideLeftResult(coloumn);
		coloumn=combineLeft(coloumn);
		coloumn=coloumn.reverse();
		for (var j = 0; j < size; j++) { 
			grid[j][i]=coloumn[j];
		}
	}
	
	if(JSON.stringify(newArray)!=JSON.stringify(grid)){
		fillRandomPlaces();
		gridDisplay();
	}
	
}

//Passing individual coloumns as a array and shifting left and then placing them back
function slideUp(){
	var newArray = grid.map(function(arr) {
		return arr.slice();
	});
	for (var i=0; i<size; i++) { 
		var coloumn = new Array(size);
		for (var j = 0; j < size; j++) { 
			coloumn.push(grid[j][i]);
		}

		coloumn=slideLeftResult(coloumn);
		coloumn=combineLeft(coloumn);

		for (var j = 0; j < size; j++) { 
			grid[j][i]=coloumn[j];
		}
		
	}
	
	
	if(JSON.stringify(newArray)!=JSON.stringify(grid)){
		fillRandomPlaces();
		gridDisplay();
	}
}

//Passing individual rows as an array , reversing them shifting left and reversing back 
function slideRight(){
	var newArray = grid.map(function(arr) {
		return arr.slice();
	});
	for(var i=0;i<size;i++){
		grid[i]=grid[i].reverse();
		grid[i]=slideLeftResult(grid[i]);
		grid[i]=combineLeft(grid[i]);
		grid[i]=grid[i].reverse();
	}
	
	if(JSON.stringify(newArray)!=JSON.stringify(grid)){
		fillRandomPlaces();
		gridDisplay();
	}
	
}

//Passing each row as a array , taking all non zero elements on left side then if 2 consiquetive elements are same add them and merge 
function slideLeft(){
	var newArray = grid.map(function(arr) {
		return arr.slice();
	});
	
	for(var i=0;i<size;i++){
		grid[i]=slideLeftResult(grid[i]);
		grid[i]=combineLeft(grid[i]);
	}
	
	if(JSON.stringify(newArray)!=JSON.stringify(grid)){
		fillRandomPlaces();
		gridDisplay();
	}
}

//Taking all Non-Zero elements o left side
function slideLeftResult(row){
	var array = row.filter(checkZero); //Removing all non zero elements
	var missing = size - array.length; //Getting the size of Zero elements on the array
	var remaiingArray = new Array(missing); //Creating a new array of the size 'missing' 
	remaiingArray.fill(0); // Fill remaiingArray them with 0
	array = array.concat(remaiingArray);//Concating them to make sure array stays on LEFT
	return array;
	
}

//Add the consecutive elements towards left 
function combineLeft(row){
	var array = row;
	for(var i=0; i<size; i++){
		if(array[i]!=0){//Only For Non Zero Elements
			if(array[i] == array[i+1]){//If consecutive elements are same
				array[i] = (array[i] + array[i+1]);//Fill the 1st from left with the total
				score = score + array[i];//Update the score
				if(sessionStorage.getItem("highScore") == null || score >= sessionStorage.getItem("highScore")){//Add highscore only if its a new game or score beats previous highscore
					sessionStorage.setItem("highScore", score);//Store the highScore
				}
				array[i+1] = 0;//Fill the 2nd with 0
				i++;//Skip adding 3 consecutive elements that are same
			}else if(array[i-1] == 0){
				array[i-1] = array[i];//Fill empty spaces
				array[i] = 0;
			}
		}
	}
	array=slideLeftResult(array);//Refill the empty spaces
	return array;
}

//Used in 'slideLeftResult' to separate non zero elemets 
function checkZero(element) {
  return element != 0;
}