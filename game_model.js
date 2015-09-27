var MODEL  = function(document){
	var game = {}

	/**
	*	@param width - desired width of board, must be greater than 0
	*	@param height - desired height of board, must be greater than 0
	*/
	var init = function (width,height) {
		if(width < 0 || height < 0){throw {"error":"failed to intialize board", "message":"invalid dimensions"};}

		game.board = new Array(height);
		for (var x = 0; x < height; x++) {
			game.board[x] = new Array(width);
			for (var y = 0; y < width; y++) {
				game.board[x][y] = Math.round(Math.random());
			}
		}
	}
	
	var step = function() {
	    game.boardNext = new Array(game.board.length);
	    for (var i = 0; i < game.board.length; i++) {
	      game.boardNext[i] = new Array(game.board[i].length);
	    }
	    for (var x = 0; x < game.board.length; x++) {
	      for (var y = 0; y < game.board[x].length; y++) {
	        var n = 0;
	        for (var dx = -1; dx <= 1; dx++) {
	          for (var dy = -1; dy <= 1; dy++) {
	            if ( dx == 0 && dy == 0){}
	            else if (typeof game.board[x+dx] !== 'undefined'
	                && typeof game.board[x+dx][y+dy] !== 'undefined'
	                && this.board[x+dx][y+dy]) {
	              n++;
	            }
	          } 
	        }
	        var c = game.board[x][y];
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
	        game.boardNext[x][y] = c;
	      }
	    }
	    game.board = game.boardNext.slice();
	}

	var getState = function  (argument) {
		return game.board;
	}



	return {"intializeBoard":init, "takeStep":step, "getBoardState",getState}
})(document);