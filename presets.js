var PRESETS = (function(document) {
	var slider = [[0,0,1],[1,0,1],[0,1,1]];
	var blinker = [[1],[1],[1]];
	var beacon = [[1,1,0,0],[1,1,0,0],[0,0,1,1],[0,0,1,1]];
	var toad = [[0,1,1,1],[1,1,1,0]];
	var shapes = [slider,blinker,beacon,toad];


	var even = function(width,height){
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



	return {"slider":slider,
			"blinker":blinker,
			"beacon":beacon,
			"toad":toad,
			"even":even,
			"random":random}
})(document);
