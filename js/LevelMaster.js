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

    this.STATE_KEYS = [
        'keyMatching', // 0
        'shapeMatching', // 1
        'colourText', // 2
        'jumping', // 3
        'hand', // 4
        'buttonMashing', // 5
        'running', // 6
    ]
	this.levelSequenceCounter = 0;
	//this.levelSequence = generateOrder(this.GAME_ARRAY_LONG);
    this.levelSequence = [0, 1, 2, 3, 5, 6];

	// set initial game data
	if (true || !data) {
		data = {
		lives: 300,
		level: 1,
		numGameTypes: 7,

		newGame: true,
		needTransition: false,
		failed: false,
		reachedEnd: false,
		decreasedLife: false,
		};
	}
	
	this.data = data;
    this.failFruits = [1, 2, 3];
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

	decreaseLife: function(blameList) {
        this.data.failFruits = blameList;
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
		this.game.state.start('newGame', true, false, this.game, this.data);
	},
	
	showFailed: function() {

		// show failed ending
        console.log("Failed");
		var _this = this;
		this.game.state.start('failState', true, false, _this.game, _this.data);
		this.data.decreasedLife = true;
	},
	
	showEnding: function() {
		// show ending for completing game
        console.log("Done");
		this.game.state.start('endState', true, false, this.game, this.data);
	},
	
	nextTransition: function() {
		// show transition for next game stage
        console.log("Transitioning");
		this.data.level++;
		this.game.state.start('transition', true, false, this.game, this.data);
	},
	
	nextLevel: function() {
        console.log("Next level. Sequence: " + this.levelSequenceCounter);
        if (this.levelSequenceCounter >= this.levelSequence.length) {
            this.showEnding();
            return;
        }

		this.game.state.start(this.STATE_KEYS[this.levelSequence[this.levelSequenceCounter]], true, false, this.game, this.data);
        console.log("upping sequence counter")
		this.levelSequenceCounter++;
        console.log("Next level after. Sequence: " + this.levelSequenceCounter);

	},
	
}
