LevelMaster = function(game, data) {
    this.game = game;
    this.MAX_LIVES = 3;
	this.GAME_ARRAY_SHORT = ["keyMatching", "keyMatching", "keyMatching", 
						"shapeMatching", "shapeMatching", "colourText", 
						"jumping", "jumping", "jumping", 
						"running", "running", "buttonMashing", 
						"buttonMashing", "buttonMashing", "hand"];

	this.GAME_ARRAY_LONG = ["keyMatching", "keyMatching", "keyMatching", "keyMatching",
						"shapeMatching", "shapeMatching", "shapeMatching", "colourText",
						"colourText", "shapeMatching", "shapeMatching", "shapeMatching", 
						"shapeMatching", "shapeMatching", "shapeMatching", "shapeMatching",
						"shapeMatching", "shapeMatching", "shapeMatching", "shapeMatching"];

	this.levelSequenceCounter = 0;
	this.levelSequence = generateOrder(this.GAME_ARRAY_LONG);

	// set initial game data
	if (!data) {
		data = {
		lives: 5,
		level: 1,
		numGameTypes: 7,

		newGame: true,
		needTransition: false,
		failed: false,
		reachedEnd: false,
		decreasedLife: false
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
        if (this.data.newGame) {
			this.data.newGame = false;
            //this.newGameTransition();
			this.data.needTransition = 0;
            this.nextLevel();

		// show transition if last state was a game state
        } else if (this.data.needTransition) {
			this.data.needTransition = false;
			this.nextTransition();
			
		// game end if failed
		} else if (this.data.failed) {
			this.showFailed();	
			
		// show ending if finished
		} else if (this.data.reachedEnd) {
			this.showEnding();
			
		// show the next game state
		} else {
			this.data.needTransition = 0;
            this.nextLevel();
        }
    },
	

	getLife: function() {
		return this.data.lives;
	},

	decreaseLife: function() {
		if (this.data.lives > 1 && !this.data.decreasedLife) {
			this.data.lives--;
			this.showFailed();

		}
		else {
			this.data.lives == 1 ? this.data.lives = 0: "";
			this.showEnding();
		}
	},

			
	newGameTransition: function() {
		// show transition for new game
		this.nextLevel();
		this.game.state.start('newGame', false, false, this.game, this.data);
	},
	
	showFailed: function() {

		// show failed ending
		var _this = this;
		this.game.state.start('failState', false, false, _this.game, _this.data);
		this.data.decreasedLife = false;
	},
	
	showEnding: function() {
		// show ending for completing game
		this.game.state.start('endState', false, false, this.game, this.data);
	},
	
	nextTransition: function() {
		// show transition for next game stage
		this.data.level++;
		this.game.state.start('transition', false, false, this.game, this.data);
	},
	
	nextLevel: function() {

		this.game.state.start(this.levelSequence[this.levelSequenceCounter], true, false, this.game, this.data);
		this.levelSequenceCounter++;

	},
	
}
