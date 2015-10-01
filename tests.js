QUnit.test( "clicking square", function( assert ){
    CONTROLLER.initGame(10,10,100);
    CONTROLLER.squareClicked(0,0);
    assert.ok(MODEL.isAlive(0,0), "clicking dead square makes it alive");
    CONTROLLER.squareClicked(0,0);
    assert.ok(!MODEL.isAlive(0,0), "clicking live square makes it dead");
});

QUnit.test("starting and stopping game", function(assert){
	CONTROLLER.initGame(10,10,10000);
    CONTROLLER.startGame();
    assert.ok(CONTROLLER.isGameRunning(), "startGame correctly starts the game");
    CONTROLLER.pauseGame();
    assert.ok(!CONTROLLER.isGameRunning(), "pauseGame correctly pauses the game");
});

QUnit.test("add valid preset",function(assert){
	CONTROLLER.initGame(10,10,10000);
	CONTROLLER.addPreset('row');
	var board = MODEL.getState();
	var even = false;
	board.forEach(function(row){
		var rowCorrect = true;
		even = true;
		row.forEach(function(col){
			if(even && col == 0){rowCorrect = false;}
			if(!even && col == 1){rowCorrect = false;}
			even = !even;
		});
		assert.ok(rowCorrect, "row is correct");
	});
});

QUnit.test("add invalid preset", function(assert){
	CONTROLLER.initGame(10,10,10000);
	CONTROLLER.addPreset('hdhdhdhdhdh');
	var board = MODEL.getState();
	var allDead = true;
	board.forEach(function(row){
		row.forEach(function(col){
			if(col != 0){allDead = false;}
		});
	});
	assert.ok(allDead, "board is still in inital state");
});

QUnit.test("add valid shape", function(assert){
	CONTROLLER.initGame(10,10,100000);
	CONTROLLER.addShape(0,0,'toad');
	var added = false;
	var board = MODEL.getState();
	board.forEach(function(row){
		row.forEach(function(col){
			if(col ==1){added = true;}
		})
	})
	assert.ok(added, "shape added");
});

QUnit.test("add invalid shape", function(assert){
	CONTROLLER.initGame(10,10,100000);
	CONTROLLER.addShape(0,0,'xdxyrdxyr');
	var added = false;
	var board = MODEL.getState();
	board.forEach(function(row){
		row.forEach(function(col){
			if(col ==1){added = true;}
		})
	})
	assert.ok(!added, "no shape added");
});