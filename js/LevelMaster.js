LevelMaster = function(game, data) {
    this.game = game;
	
	// set initial game data
	if (!data) {
		data = {
		lives: 5,
		level: 1,
		newGame: 1,
		needTransition: 0,
		failed: 0,
		reachedEnd: 0,
		numGameTypes: 5
		};
	}
	
	this.data = data;
}
	
LevelMaster.prototype = {
	
	create: function() {
        // decide if we want to show transition state or go to the next game state
        this.decideGameState();
	},
	
	decideGameState: function() {
		// if new game show intro transition
        if (this.data.newGame == 1) {
			this.data.newGame = 0;
            this.newGameTransition();
			
		// show transition if last state was a game state
        } else if (this.data.needTransition == 1) {
			this.data.needTransition = 0;
			this.nextTransition();
			
		// game end if failed
		} else if (this.data.failed == 1) {
			this.showFailed();	
			
		// show ending if finished
		} else if (this.data.reachedEnd == 1) {
			this.showEnding();
			
		// show the next game state
		} else {
			this.data.needTransition = 0;
            this.nextLevel();
        }
    },
	
	newGameTransition: function() {
		// show transition for new game
		console.log("in new game");
		this.nextLevel();
		this.game.state.start('newGame', false, false, this.data);
	},
	
	showFailed: function() {
		// show failed ending
		this.game.state.start('failed', false, false, this.data);
	},
	
	showEnding: function() {
		// show ending for completing game
		this.game.state.start('end', false, false, this.data);
	},
	
	nextTransition: function() {
		// show transition for next game stage
		this.data.level++;
		this.game.state.start('transition', false, false, this.data);
	},
	
	nextLevel: function() {
		// start the next game stage
		
		// pick a game type randomly
		//var gameType = this.game.rnd.integerInRange(1, this.data.numGameTypes);
		var gameType = this.game.rnd.integerInRange(4, 4);
		
		switch(gameType) {
		case 1: 
			console.log("In case 1");
			this.game.state.start('keyMatching', false, false, this.game, this.data);
			break;
		case 2:
		console.log("In case 2");
			this.game.state.start('shapeMatching', false, false, this.game, this.data);
			break;
		case 3: 
		console.log("In case 3");
			this.game.state.start('colourText', false, false, this.game, this.data);
			break;
		case 4:
		console.log("In case 4");
			this.game.state.start('jumping', false, false, this.game, this.data);
			break;
		case 5:
		console.log("In case 5");
			this.game.state.start('running', false, false, this.game, this.data);
			break;
		default:
			this.game.state.start('jumping', false, false, this.game, this.data);
			break;
		}
		
	},
	
}
