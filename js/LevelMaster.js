LevelMaster = function(game) {
    this.game = game;
    var NUM_GAME_TYPES = 5;
    this.data = {
		lives: 5,
		level: 1,
		newGame: true,
		needTransition: false,
		failed: false,
		reachedEnd: false,
		decreasedLife: false
    };
}
	
LevelMaster.prototype = {
	create: function() {
        // decide if we want to show transition state or go to the next game state
        this.decideGameState();
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

	decideLevelState: function() {
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
	
	newGameTransition: function() {
		// show transition for new game
		this.game.state.start('newGame', false, false, this.data);
	},
	
	showFailed: function() {
		// show failed ending
		var _this = this;
		this.game.state.start('failState', false, false, _this.game);
		this.data.decreasedLife = false;
	},
	
	showEnding: function() {
		// show ending for completing game
		this.game.state.start('endState', false, false, this.data);
	},
	
	nextTransition: function() {
		// show transition for next game stage
		this.data.level++;
		this.game.state.start('transition', false, false, this.data);
	},
	
	nextLevel: function() {
		// start the next game stage
		
		// pick a game type randomly
		var gameType = getRandomInt(1, NUM_GAME_TYPES);
		
		switch(gameType) {
		case 1: 
			this.game.state.start('keyMatching', false, false, this.data);
			break;
		case 2:
			this.game.state.start('shapeMatching', false, false, this.data);
			break;
		case 3: 
			this.game.state.start('colourText', false, false, this.data);
			break;
		case 4:
			this.game.state.start('jumping', false, false, this.data);
			break;
		case 5:
			this.game.state.start('running', false, false, this.data);
			break;
		default:
			this.game.state.start('jumping', false, false, this.data);
			break;
		}
		
	},
	
}