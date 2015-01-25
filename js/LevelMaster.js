LevelMaster = function(game, data) {
    this.game = game;
    this.MAX_LIVES = 3;
	
	// set initial game data
	if (!data) {
		data = {
		lives: 5,
		level: 1,
		numGameTypes: 5,

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
        if (this.data.newGame == 1) {
			this.data.newGame = 0;
            this.newGameTransition();
		// show transition if last state was a game state
        } else if (this.data.needTransition) {
			this.data.needTransition = 0;
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
			console.log(this.data.lives);
			this.showFailed();

		}
		else {
			this.data.lives == 1 ? this.data.lives = 0: "";
			console.log('you dead');
			this.showEnding();
		}
	},

			
	newGameTransition: function() {
		// show transition for new game
		console.log("in new game");
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
			this.game.state.start('hand', false, false, this.game, this.data);
			break;
		default:
			this.game.state.start('jumping', false, false, this.game, this.data);
			break;
		};
        var gm = GetGameManager(this.game);
        gm.reorderHud();
		
	},
	
}
