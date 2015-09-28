var GAME  = function(document){

	/**
	*	@param width - desired width of board, must be greater than 0
	*	@param height - desired height of board, must be greater than 0
	*/
	var Board = function (width,height) {
		if(width < 0 || height < 0){throw {"error":"invalid dimensions"};}

		var board = new Array(height);
		for (var x = 0; x < height; x++) {
			board[x] = new Array(width);
			for (var y = 0; y < width; y++) {
				board[x][y] = Math.round(Math.random());
			}
		}

		/**
		*  performs one iterations on the board
		*/
		this.step = function() {
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
		this.birthSquare = function(row,col){
			if(!withinWidthAndHeight(row,col))
				throw {"error":"out of bounds"}
			board[row][col] = 1
		}

		/**
		* turn a square to the dead state
		*/
		this.killSquare = function(row,col){
			if(!withinWidthAndHeight(row,col))
				throw {"error":"out of bounds"}
			board[row][col] = 0
		}

		/**
		* return a copy of the board
		*/
		this.getState = function () {
			return board.slice(0);
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

	var WIDTH = 50;
	var HEIGHT = 50;
	var myBoard = new Board(WIDTH,HEIGHT);
	var playing = false;

	return {"pauseGame":pauseGame, 
			"startGame":startGame, 
			"getBoard":myBoard.getState,
			"birthSquare":myBoard.birthSquare, 
			"killSquare":myBoard.killSquare}
})(document);