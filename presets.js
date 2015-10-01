/**
* This interface holds all the preset configurations and shapes that can be droped into the board
*/
var PRESETS = (function(document) {
	var slider = [[0,0,1],[1,0,1],[0,1,1]];
	var blinker = [[1],[1],[1]];
	var beacon = [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]];
	var toad = [[0,1,1,1],[1,1,1,0]];
	var shapes = [slider,blinker,beacon,toad];

	/**
	* takes the desired width and height of the board
	* produces a board state where every other row is alive
	*/
	var rows = function(width,height){
		var board = new Array(height);
		for(var row = 0; row < height; row++){
			board[row] = new Array(width);
			for(var col = 0; col < width; col++){
				if(col%2==0){
					board[row][col] = 1;
				}else{
					board[row][col] = 0;
				}
			}
		}
		return board;
	}

	/**
	* takes the desired width and height of the board
	* produces a random board
	*/
	var random = function(width,height){
		var board = new Array(height);
		for(var row = 0; row < height; row++){
			board[row] = new Array(width);
			for(var col = 0; col < width; col++){
				board[row][col] = Math.round(Math.random());
			}
		}
		return board;
	}

	/**
	* takes the desired width and height of the board
	* produces a checkerboard style board
	*/
	var boxes = function(width,height){
		var board = new Array(height);
		for(var row = 0; row < height; row++){
			board[row] = new Array(width);
			for(var col = 0; col < width; col++){
				if(col%3==0 || row%3==0){
					board[row][col] = 1;
				}else{
					board[row][col] = 0;
				}
			}
		}
		return board;
	}



	return {"slider":slider,
			"blinker":blinker,
			"beacon":beacon,
			"toad":toad,
			"rows":rows,
			"random":random,
			"boxes":boxes}
})(document);
