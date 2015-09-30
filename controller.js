var CONTROLLER = (function(document) {
	var interval = 1000;
	var iterator;
	var isRunning;

	//string refering to the preset shapes
	var SLIDER = 'slider';
	var BEACON = 'beacon';
	var BLINKER = 'blinker';
	var TOAD = 'toad';

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
		DISPLAY.update(MODEL.getState());
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
		DISPLAY.update(MODEL.getState());
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
		DISPLAY.update(MODEL.getState());
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

		if(toAdd === SLIDER){MODEL.dropIn(row,col,PRESETS.slider);}
		else if(toAdd === BEACON){MODEL.dropIn(row,col,PRESETS.beacon);}
		else if(toAdd === BLINKER){MODEL.dropIn(row,col,PRESETS.blinker);}
		else if(toAdd === TOAD){MODEL.dropIn(row,col,PRESETS.toad);}
		else{throw {"error":"invalid add string"}};
		DISPLAY.update(MODEL.getState());

	}

	var addPreset = function(preset){
		if(preset.indexOf('even') >=0){
			MODEL.setState(PRESETS.even(MODEL.getWidth(),MODEL.getHeight()));
		}else if(preset.indexOf('random') >=0){
			MODEL.setState(PRESETS.random(MODEL.getWidth(),MODEL.getHeight()));
		}
		DISPLAY.update(MODEL.getState());

	}

	/**
	* resets board and updates display
	*/
	var clearBoard = function(){
		MODEL.resetBoard();
		DISPLAY.update(MODEL.getState());
	}


	return {"pauseGame":pauseGame, 
		"startGame":startGame,
		"stepAndUpdate":stepAndUpdate,
		"initGame":initGame,
		"isGameRunning":isGameRunning,
		"squareClicked":squareClicked,
		"addPreset":addPreset,
		"addShape":addShape,
		"SLIDER":SLIDER,
		"BEACON": BEACON,
		"BLINKER":BLINKER,
		"TOAD":TOAD,
		"clearBoard":clearBoard};
})(document);
