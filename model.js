var MODEL  = (function(document){
	var board = null;

	//preset shapes
	

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
				board[x][y] = 0;
			}
		}
	}

	/**
	* resets the board to all dead squares
	*/
	var resetBoard = function(){makeBoard(getWidth(),getHeight());}

	

	/**
	*  performs one iterations on the board if the board has already been initialized
	*/
	var step = function() {
		if(board == null){throw {"error":"must makeBoard(w,h) first"};}
		var boardNext = new Array(board.length);
		for (var i = 0; i < board.length; i++) {
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
	* adds the array to the board at the given row and col, ignores any locations that are out of bounds
	*/ 
	var dropIn = function(row,col,array){
		row = Math.floor(row);
		col = Math.floor(col);
		for(var r = row; r < row + array.length; r++){
			for(var c = col; c < col +array[0].length; c++){
				if(!outOfBounds(r,c)){
					board[r][c] = array[r-row][c-col];
				}
			}
		}
	}

	/**
	* turns a square on if it is off and off if it is on
	*/
	var switchSquare = function(row,col){
		if(outOfBounds(row,col)){throw {"error":"out of bounds"};}
		board[row][col] =  Math.abs(board[row][col]-1);
	}

	/**
	*  return width of the board
	*/
	var getWidth = function(){
		return board[0].length;
	}

	/**
	* return height of the board
	*/
	var getHeight = function(){
		return board.length;
	}

	/**
	* returns a copy of the board
	*/
	var getState = function(){return board.slice(0);}


	var setState = function(state){board = state;}

	/**
	* return false if row and col are within the dimensions of the board ow returns trues
	*/
	var outOfBounds = function(row,col){
		if(row >= getHeight() || col >= getWidth() || row < 0 || col < 0){
			return true;
		}
		return false;
	}
	

	return {"makeBoard":makeBoard,
		"getState":getState,
		"getWidth":getWidth,
		"getHeight":getHeight,
		"switchSquare":switchSquare,
		"step":step,
		"slider":slider,
		"beacon":beacon,
		"toad":toad,
		"blinker":blinker,
		"dropIn":dropIn,
		"resetBoard":resetBoard,
		"setState":setState};
})(document);
