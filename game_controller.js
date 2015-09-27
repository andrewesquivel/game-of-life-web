var CONTROLLER  = function(document){
	var step;
	var getBoard;
	var displayBoard;
	var alive = false;

	var start = function(initializeBoard,stepFunction,getBoardFunction, displayFunction) {
		initializeBoard();
		step = stepFunction;
		getBoard = getBoardFunction;
		displayBoard = displayFunction;
		startLiving();
	}

	var startLiving = function(){
		alive = true;
		while(alive){setTimeout(stepAndPrint,5000)}
	}

	var pauseLiving = function(){
		alive = false;
	}

	var stepAndPrint = function(){
		step();
		displayBoard();
	}

	return {"startGame":start, "pauseGame":pauseLiving, "restartGame":startLiving}
})(document);