/**
* This interface handles the board, creating it, adding to it, taking the board through a step, reseting the board etc
*/
var MODEL  = (function(document){
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
			for (var y = 0; y < width; y++) {board[x][y] = 0;}
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
		for (var i = 0; i < board.length; i++) {boardNext[i] = new Array(board[i].length);}
		for (var r = 0; r < board.length; r++) {
			for (var c = 0; c < board[r].length; c++) {
				var neighbors = getNeighbors(r,c);
				var count = countAlive(neighbors);
				var getNextVal = getNextValFunction(board[r][c]);
				boardNext[r][c] = getNextVal(count);
			}
		}
		board = boardNext;
	}

	/**
	* value - 0 or 1
	* returns a function that when called with a count (of alive neighbors) and returns the next value for that square
	*/
	var getNextValFunction = function(value){
		//EXAMPLE USE OF FUNCTIONALS
		var getNextVal = function(count){
			if(value == 1){
				if(count < 2 || count > 3){return 0;}
				return 1;
			}
			if(count == 3){return 1;}
			return 0;
		}
		return getNextVal;
	}

	/**
	* row & col must be a number
	* returns a list of all the neighboring cels to the given row and col
	*/
	var getNeighbors = function(row,col){
		if(outOfBounds(row,col)){throw{"error":"out of bounds"};}
		var neighbors = [];
		var deltas = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
		//EXAMPLE USE OF FUNCTIONALS
		deltas.forEach(function(delta){
			var nRow = row + delta[0];
			var nCol = col + delta[1];
			if(!outOfBounds(nRow,nCol)){
				neighbors.push(board[nRow][nCol]);
			}
		});
		return neighbors;
	}

	/**
	* neighbors - must be an array
	* return the number of alive neighbors in the list (ie neighbor ==1)
	*/
	var countAlive = function(neighbors){
		//EXAMPLE USE OF FUNCTIONALS
		return neighbors.reduce(function(previousValue, currentValue, index, array) {
  			return previousValue + currentValue;
		});
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
		if(getHeight() > 0){return board[0].length;}
		return 0;
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

	var isAlive = function(r,c){
		if(outOfBounds(r,c)){return false;}
		if(board[r][c]){return true;}
		return false;
	}


	/**
	* state must be a two dimensional array
	* sets the board to the state
	*/
	var setState = function(state){board = state;}

	/**
	* return false if row and col are within the dimensions of the board ow returns trues
	*/
	var outOfBounds = function(row,col){
		if(row >= getHeight() || col >= getWidth() || row < 0 || col < 0){return true;}
		return false;
	}
	

	return {"makeBoard":makeBoard,
		"getState":getState,
		"getWidth":getWidth,
		"getHeight":getHeight,
		"switchSquare":switchSquare,
		"step":step,
		"dropIn":dropIn,
		"resetBoard":resetBoard,
		"setState":setState,
		"isAlive":isAlive};
})(document);
