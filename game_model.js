var MODEL  = function(document){
	var hasSteppped = false;
	var board = null;

	/**
	*	@param width - desired width of board, must be greater than 0
	*	@param height - desired height of board, must be greater than 0
	*/
	var makeBoard = function (width,height) {
		if(width < 0 || height < 0){throw {"error":"invalid dimensions"};}

		board = new Array(height);
		for (var x = 0; x < height; x++) {
			board[x] = new Array(width);
			for (var y = 0; y < width; y++) {
				board[x][y] = Math.round(Math.random());
			}
		}
	}

	

		

	/**
	*  performs one iterations on the board if the board has already been initialized
	*/
	var step = function() {
		if(board == null){throw {"error":"must makeBoard(w,h) first"};}
	   	if(!hasStepped){hasStepped = true;}
		var boardNext = new Array(board.length);
		for (var i = 0; i < game.board.length; i++) {
		boardNext[i] = new Array(board[i].length);
		}
		for (var x = 0; x < board.length; x++) {
		for (var y = 0; y < board[x].length; y++) {
		var n = 0;
		for (var dx = -1; dx <= 1; dx++) {
		  for (var dy = -1; dy <= 1; dy++) {
		    if ( dx == 0 && dy == 0){}
		    else if (typeof board[x+dx] !== 'undefined'
			&& typeof board[x+dx][y+dy] !== 'undefined'
			&& board[x+dx][y+dy]) {
		      n++;
		    }
		  } 
		}
		var c = board[x][y];
		switch (n) {
		  case 0:
		  case 1:
		    c = 0;
		    break;
		  case 2:
		    break; 
		  case 3:
		    c = 1;
		    break;
		  default:
		    c = 0;
		}
		boardNext[x][y] = c;
		}
		}
		board = boardNext;
	}

	/**
	* turn a square to the alive state
	*/
	var birthSquare = function(row,col){
		if(!withinWidthAndHeight(row,col)){throw {"error":"out of bounds"};}
		if(hasStepped) {throw {"error":"can only call before first step"}
		board[row][col] = 1
	}

	/**
	* turn a square to the dead state
	*/
	var killSquare = function(row,col){
		if(!withinWidthAndHeight(row,col)){throw {"error":"out of bounds"};}
		if(hasStepped) {throw {"error":"can only call before first step"}
		board[row][col] = 0
	}

	var getWidth = function(){
		if(!withinWidthAndHeight(row,col)){throw {"error":"out of bounds"};}
		return board[0].length;
	}

	var getHeight = function(){
		if(!withinWidthAndHeight(row,col)){throw {"error":"out of bounds"};}
		return board.length;
	}

	var isAlive = function(row,col){
		if(board == null){throw {"error":"must makeBoard(w,h) first"};}
		if(!withinWidthAndHeight(row,col) && this.stepCount == 0){
			throw {"error":"out of bounds"}
		}

	}

	

	

	/**
	* return true if row and col are within the dimensions of the board
	*/
	var withinWidthAndHeight = function(row,col){
		if(row > getBoardHeight() || col > getBoardWidth() || row < 0 || col < 0){
			return false;
		}
		return true;
	}

	

	var myBoard;
	
	

	return {"makeBoard":makeBoard,
		"getBoard":getState,
		"birthSquare":birthSquare,
		"killSquare":killSquare }
})(document);
