//Displaying the grid
function gridDisplay(){
	//Display grid in the console
	console.clear();
	console.table(grid);
	console.info("Score = "+score);
	console.info("High Score = "+sessionStorage.getItem("highScore"));
	//-------------------------------------------------------------------------------------------------------------------------
	
	//Display grid as a table in html
	$("#grid" ).remove();
	$("#gameOver" ).remove();
	$("#highScore" ).remove();
	$("#gameWon").remove();
	document.write("<table id='grid' style ='border-spacing: 0px;'><tbody>");//Initialize table
	for (var i = 0; i < size; i++) { 
		document.write("<tr>"); //Initialize the row
		for (var j = 0; j < size; j++) { 
			//Fill StoreGrid with the state of each block 
			storeGrid[i][j].history.push(grid[i][j]);//List of all values the block had
			storeGrid[i][j].right=j != (size-1) ? grid[i][j+1] : null;//Value Upwards
			storeGrid[i][j].left=j != 0 ? grid[i][j-1] : null;//Value Downwards
			storeGrid[i][j].up=i != 0 ? grid[i-1][j] : null;//Value towards Left
			storeGrid[i][j].down=i != (size-1) ? grid[i+1][j] : null;//Value towards Right
		
		if(grid[i][j]!=0){//Only display value if elements is not zero
			document.write("<td style ='text-align: center; width:60px;height:60px;border:1px solid black;background-color:hsl("+grid[i][j]+"0, 100%, 64%);'>");//Writing each block with colore corresponding to its value
			 document.write(grid[i][j]); //The value of the block
		}else{
			document.write("<td style ='text-align: center; width:60px;height:60px;border:1px solid black;'>");
			document.write(""); 
		}
		document.write("</td>"); 
		} 
		document.write("</tr>"); 
	}
	document.write("</tbody></table>");//Closing the table
	$("#newGame").remove();
	document.write("<p><input id='newGame' type='submit' value='New Game' onClick='newGame()'></p>");//Button to start new game
	$("#score" ).remove();
	document.write("<p id='score'>Score = "+score+"</p>");//Display Score
	$("#highScore" ).remove();
	if(sessionStorage.getItem("highScore") != null){//Only if highScore is not null
	document.write("<p id='highScore'>High Score = "+sessionStorage.getItem("highScore")+"</p>");//Display Highscore
	}
	
	if(isOver()){//Function which checks if 2048 is reached
		console.info("CONGRATS YOU HAVE WON !!!!");
		$("#gameWon").remove();
		document.write("<p id='gameWon'>CONGRATS YOU HAVE WON !!!!</p>");//Display Message
	}	
	if(isGameOver()){//Function which checks if there are any more moves left
		console.info("GAME OVER !!!!");
		$("#gameOver" ).remove();
		document.write("<p id='gameOver'>GAME OVER !!!!</p>");//Display Message
	}
	//Fill Session Storage with Grids and scores in order to avoid refreshing of a session
	sessionStorage.setItem("grid", JSON.stringify(grid)); 
	sessionStorage.setItem("storeGrid", JSON.stringify(storeGrid));
	sessionStorage.setItem("score", score);

}
