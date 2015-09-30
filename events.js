$('#startStop').click(function(){
	if(CONTROLLER.isGameRunning()){
		CONTROLLER.pauseGame();
		$(this).text('Start');

	}else{
		CONTROLLER.startGame();
		$(this).text('Stop');
	}
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


$('#even').on('click',function(){
	CONTROLLER.addPreset('even');
});

$('#random').on('click',function(){
	CONTROLLER.addPreset('random');
});

$('#step').on('click',function(){
	CONTROLLER.stepAndUpdate();
});


var toAdd = null;

$('#clear').on("click",function(){
	CONTROLLER.clearBoard();
});

$('#slider').on("click", function(){
	if(toAdd == CONTROLLER.SLIDER){
		$(this).css('color', '');
		toAdd = null;
	}
	else{
		$('.button').css('color','');
		$(this).css('color','red');
		toAdd = CONTROLLER.SLIDER;
	}
});

$('#blinker').on("click", function(){
	if(toAdd == CONTROLLER.BLINKER){
		$(this).css('color', '');
		toAdd = null;
	}
	else{
		$('.button').css('color','');
		$(this).css('color','red');
		toAdd = CONTROLLER.BLINKER;
	}
});

$('#toad').on("click", function(){
	if(toAdd == CONTROLLER.TOAD){
		$(this).css('color', '');
		toAdd = null;
	}
	else{
		$('.button').css('color','');
		$(this).css('color','red');
		toAdd = CONTROLLER.TOAD;
	}
});

$('#beacon').on("click", function(){
	if(toAdd == CONTROLLER.BEACON){
		$(this).css('color', '');
		toAdd = null;
	}
	else{
		$('.button').css('color','');
		$(this).css('color','red');
		toAdd = CONTROLLER.BEACON;
	}
});
