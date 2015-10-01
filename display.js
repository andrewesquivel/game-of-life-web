/*
* This interface handles putting the board in the display
*/
var DISPLAY = (function(document){
	var myCanvas = document.getElementById('board');
	var myContext = myCanvas.getContext('2d');
	var canvasWidth  = myCanvas.offsetWidth;
	var canvasHeight = myCanvas.offsetHeight;

	/**
	* array - must be 2 dimensional and have lengths greater than 0
	* displays the array in the canvas
	*/
	var update = function(array){
		if(array.length == 0 || array[0].length ==0){throw{"error":"invalid array"};}
		var rectWidth = canvasWidth / array[0].length;
		var rectHeight = canvasHeight / array.length;
		for (var x = 0; x < array.length; x++) {
			var l = "";
			for (var y = 0; y < array.length; y++) {
				if (array[x][y])
					myContext.fillStyle = "purple";
				else
					myContext.fillStyle = "yellow";
				myContext.fillRect(x*rectWidth, y*rectHeight,rectWidth,rectHeight);
			}
		}
	}
	return {"update":update};
})(document);
