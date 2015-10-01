$('#startStop').click(function(){
	if(CONTROLLER.isGameRunning()){
		CONTROLLER.pauseGame();
		$(this).text('Start');

	}else{
		CONTROLLER.startGame();
		$(this).text('Stop');
	}
});

$('#step').click(function(){
	CONTROLLER.stepAndUpdate();
});

$('#board').on("click", function(e) {
	var boardWidth = $(this).width();
	var boardHeight = $(this).height();
	var parentOffset = $(this).offset(); 
    var relX = e.pageX - parentOffset.left;
    var relY = e.pageY - parentOffset.top;
    var percWidth = relX/boardWidth;
    var percHeight = relY/boardHeight;
    if(toAdd){CONTROLLER.addShape(percWidth,percHeight,toAdd);}
    else{CONTROLLER.squareClicked(percWidth,percHeight);}
});

$('.presets').on('click', function(e){
	CONTROLLER.addPreset(e.target.id);
});


$('#clear').on("click",function(){
	CONTROLLER.clearBoard();
});


var toAdd = null;
$('.shapes').on('click', function(e){
	var id =e.target.id;
	if(toAdd == id){
		$('#'+id).css('color', '');
		toAdd = null;
	}
	else{
		$('.shapes').css('color','');
		$('#'+id).css('color','red');
		toAdd = id;
	}
});


