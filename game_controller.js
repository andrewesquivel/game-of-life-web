var CONTROLLER = function(document){
	var step;
	var update;
	var interval;
	var playing = false;

	var initGame = function(stepFunction,displayFunction,stepInterval){
		step = stepFunction;
		update = displayFunction;
		interval = stepInterval;
	}
	
	var startGame = function(){
		playing = true;
		while(playing){setTimeout(myBoard.step(),5000);}
	}

	var pauseGame = function(){
		playing = false;
	}

	var gameIsRunning = function(){
		return playing;
	}


	return {"pauseGame":pauseGame, 
		"startGame":startGame, 
		"gameIsRunning":gameIsRunning}
})(document);
