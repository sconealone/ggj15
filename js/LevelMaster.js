LevelMaster = function(game) {
    this.game = game;
}
	
LevelMaster.prototype = {
	// set initial game data if new game
	initData: function(data) {
	if (!data) {
		data = {
		lives: 5,
		level: 1,
		newGame: 1,
		needTransition: 0,
		failed: 0,
		reachedEnd: 0
		};
	}
	
	this.data = data;
	},
	
	create: function() {
        // decide if we want to show transition state or go to the next game state
        this.decideGameState();
	},
	
	decideLevelState: function() {
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
		this.game.state.start('newGame', false, false, this.data);
	},
	
	showFailed: function() {
		// show failed ending
		this.game.state.start('failed', true, false, this.data);
	},
	
	showEnding: function() {
		// show ending for completing game
		this.game.state.start('endGame', true, false, this.data);
	},
	
	nextTransition: function() {
		// show transition for next game stage
		this.data.level++;
		this.game.state.start('transition', false, false, this.data);
	},
	
	nextLevel: function() {
		// start the next game stage
	},
	
}