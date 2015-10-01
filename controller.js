/*
* This interface handles the game itself, starting and stopping the game, as well as telling the display when to update
*/
var CONTROLLER = (function(document) {
	var interval = 1000;
	var iterator;
	var isRunning;

	//string refering to the preset shapes
	

	/**
	* width - must be greater than 0
	* height - must be greater than 0
	* stepInterval - must be at least 0
	* initializes the game by initializing the board and displaying the board
	*/
	var initGame = function(width,height,stepInterval){
		if(width <= 0 || height <= 0){throw {"error" : "invalid dimensions"};}
		if(stepInterval < 0){throw {"error":"invalid interval"};}
		MODEL.makeBoard(width,height);
		updateDisplay();
		interval = stepInterval;
	}
	
	/**
	* starts the stepping and updating on the interval
	*/
	var startGame = function(){
		isRunning = true;
		iterator = setInterval(stepAndUpdate,interval);
	}

	/**
	* stops the step and updating interval
	*/
	var pauseGame = function(){
		isRunning = false;
		clearInterval(iterator)
	}

	/**
	* steps the board and updates the display
	*/
	var stepAndUpdate = function(){
		MODEL.step();
		updateDisplay();
	}

	var updateDisplay = function(){
		if(typeof DISPLAY != 'undefined'){
			DISPLAY.update(MODEL.getState());
		}
	}

	/**
	* returns true if the game is stepping and updating, ow returns false
	*/
	var isGameRunning = function(){
		return isRunning
	}

	/**
	* percW - percentage refering to the distance of the click from the left side of the board
	* percH - percentage refering to the distance of the click from the top of the board
	*/
	var squareClicked = function(percW, percH){
		if(isRunning){return;}
		var row =Math.floor(percW*MODEL.getWidth());
		var col =Math.floor(percH*MODEL.getHeight());

		MODEL.switchSquare(row,col);
		updateDisplay();
	}

	/**
	* percW - percentage refering to the distance of the click from the left side of the board
	* percH - percentage refering to the distance of the click from the top of the board
	* toAdd - string must be noe of the constants defined aove
	* adds the preset shape to the board
	*/
	var addShape = function (percW,percH,toAdd){
		if(isRunning){return;}
		var row =Math.floor(percW*MODEL.getWidth());
		var col =Math.floor(percH*MODEL.getHeight());

		if(toAdd.indexOf('slider') >=0){MODEL.dropIn(row,col,PRESETS.slider);}
		else if(toAdd.indexOf('beacon')>=0){MODEL.dropIn(row,col,PRESETS.beacon);}
		else if(toAdd.indexOf('blinker')>=0){MODEL.dropIn(row,col,PRESETS.blinker);}
		else if(toAdd.indexOf('toad')>=0){MODEL.dropIn(row,col,PRESETS.toad);}
		// else{throw {"error":"invalid add string"}};
		updateDisplay();

	}

	/**
	* preset - must contain "row", "random", or "box"
	* sets the board to one of the preset states
	*/
	var addPreset = function(preset){
		var width = MODEL.getWidth();
		var height = MODEL.getHeight();
		if(preset.indexOf('row') >=0){MODEL.setState(PRESETS.rows(width,height));}
		else if(preset.indexOf('random') >=0){MODEL.setState(PRESETS.random(width,height));}
		else if(preset.indexOf('box') >=0){MODEL.setState(PRESETS.boxes(width,height));}
		updateDisplay();

	}

	/**
	* resets board and updates display
	*/
	var clearBoard = function(){
		MODEL.resetBoard();
		updateDisplay();
	}


	return {"pauseGame":pauseGame, 
		"startGame":startGame,
		"stepAndUpdate":stepAndUpdate,
		"initGame":initGame,
		"isGameRunning":isGameRunning,
		"squareClicked":squareClicked,
		"addPreset":addPreset,
		"addShape":addShape,
		"clearBoard":clearBoard};
})(document);
