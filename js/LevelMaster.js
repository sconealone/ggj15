LevelMaster = function(game, data) {

    console.log("LEVEL MASTER CONSTRUCTOR")
    this.game = game;
    this.MAX_LIVES = 3;
	this.GAME_ARRAY_SHORT = ["keyMatching", "keyMatching", "keyMatching", 
						"shapeMatching", "shapeMatching", "colourText", 
						"jumping", "jumping", "jumping", 
						"running", "running", "buttonMashing", 
						"buttonMashing", "buttonMashing", "hand"];

	// this.GAME_ARRAY_LONG = ["keyMatching", "keyMatching", "keyMatching", "keyMatching",
	// 					"shapeMatching", "shapeMatching", "shapeMatching", "colourText",
	// 					"colourText", "shapeMatching", "shapeMatching", "shapeMatching", 
	// 					"shapeMatching", "shapeMatching", "shapeMatching", "shapeMatching",
	// 					"shapeMatching", "shapeMatching", "shapeMatching", "shapeMatching"];

	

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
    this.levelSequence = [1, 1, 1, 3, 4, 1, 6];



	// set initial game data
	if (true || !data) {
		data = {
		lives: 3,
		level: 1,
		numGameTypes: 7,

		newGame: true,
		needTransition: false,
		failed: false,
		reachedEnd: false,
		decreasedLife: false,
		bgm: null
		};
	}
	
	this.data = data;
    this.failFruits = [1, 2, 3];
}
	
LevelMaster.prototype = {
	preload: function() {
		this.load.audio('bgmI2', ['assets/sounds/intensity2.wav']);
		this.load.audio('bgmI3', ['assets/sounds/intensity3.wav']);
		this.load.audio('bgmI4', ['assets/sounds/intensity4.wav']);
	},
	create: function() {
        console.log("LEVEL MASTER CREATE")
        GetGameManager(this.game, this);
        // decide if we want to show transition state or go to the next game state
        console.log("create");
        this.bgmI2 = this.game.add.audio("bgmI2");
        this.bgmI3 = this.game.add.audio("bgmI3");
        this.bgmI4 = this.game.add.audio("bgmI4");

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

        return;
    },
	

	getLife: function() {
		return this.data.lives;
	},

	decreaseLife: function(blameList) {
        console.log("LOSE A LIFE");
        this.data.failFruits = blameList;
		if (this.data.lives > 1) {
			this.data.lives--;
			this.showFailed();
		}
		else {
            console.log("DECREASE LIFE END");
            console.log("data.lives: " + this.data.lives);
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

		console.log(this.data);
		// show failed ending

		this.game.state.start('failState', true, false, this.game, this.data);
        console.log("Failed");
		this.data.decreasedLife = true;
    	this.game.state.states['failState'].bgm.stop();

	},
	
	showEnding: function() {
		// show ending for completing game
		this.game.state.start('endState', true, false, this.game, this.data);
	},
	
	nextTransition: function() {
		// show transition for next game stage
        console.log("Transitioning");
		this.data.level++;
		this.game.state.start('transition', true, false, this.game, this.data);
	},
	
	nextLevel: function() {
		var gm = GetGameManager(this.game)
		gm.p1Resp.responded = false;
		gm.p2Resp.responded = false;
		gm.p3Resp.responded = false;
		gm.p4Resp.responded = false;

		if (this.levelSequenceCounter < 1) {
			this.data.bgm = this.bgmI2;
			this.game.state.states['failState'].bgm = this.bgmI2;

			this.bgmI2.play();
			console.log(this.data);
		}
		else if (this.levelSequenceCounter < 2) {
			this.game.state.states['failState'].bgm = this.bgmI3;
			this.bgmI3.play();
		}
		else if (this.levelSequenceCounter >= 2) {
			this.game.state.states['failState'].bgm = this.bgmI4;
			this.bgmI4.play();
		}


        if (this.levelSequenceCounter >= this.levelSequence.length) {
            this.showEnding();
            return;
        }

		this.game.state.start(this.STATE_KEYS[this.levelSequence[this.levelSequenceCounter]], true, false, this.game, this.data);

		this.levelSequenceCounter++;

	},
	
}
