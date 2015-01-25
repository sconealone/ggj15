_gameManager = null;
GetGameManager = function(game) {
    if (_gameManager == null) {
        _gameManager = new GameManager(game);
        _gameManager.preload();
        _gameManager.create();
    }
    return _gameManager
}

GameManager = function(game) {
	this.game = game;
	miniGame = null;
    this.hud = new Hud(this, 4);
    this.MIN_KEY_VAL = 0;
    this.MAX_KEY_VAL = 2;
    this.timer = new Timer(this);
}

GameManager.prototype = {
    initializeKeys: function() {
        this.p1Resp = {
            0: this.game.input.keyboard.addKey(Phaser.Keyboard.Q),  
            1: this.game.input.keyboard.addKey(Phaser.Keyboard.W), 
            2: this.game.input.keyboard.addKey(Phaser.Keyboard.E),
            responded: false
        };

        this.p2Resp = {
            0: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            1: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            2: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
            responded: false
        };

        this.p3Resp = {
            0: this.game.input.keyboard.addKey(Phaser.Keyboard.I),  
            1: this.game.input.keyboard.addKey(Phaser.Keyboard.O), 
             2: this.game.input.keyboard.addKey(Phaser.Keyboard.P),
             responded: false
         };

        this.p4Resp = {
            0: this.game.input.keyboard.addKey(Phaser.Keyboard.J),  
            1: this.game.input.keyboard.addKey(Phaser.Keyboard.K), 
            2: this.game.input.keyboard.addKey(Phaser.Keyboard.L),
            responded: false
        };
    },

	preload: function() {
		_this = this;

	
		// miniGame = new ShapeMatching(_this);
        // miniGame = new KeyMatching(_this);

		//miniGame.preload();
        this.hud.preload();
	},

	create: function() {
        //initialize the keys for each player
        this.initializeKeys();

		this.hud.create();
        
	},

	update: function() {
        this.timer.update();
	}
}

// Hud is the player avatars + time countdown
Hud = function(gameManager, numPlayers) {
    this.gameManager = gameManager;

    // constants
    this.NO_ANSWER = 0;
    this.WRONG = 1;
    this.RIGHT = 2;

    this.numPlayers = numPlayers;

    this.FRAME_APPLE_NO_ANSWER = 0;
    this.FRAME_APPLE_WRONG = 2;
    this.FRAME_APPLE_RIGHT = 4;

    this.FRAME_BANANA_NO_ANSWER = 1;
    this.FRAME_BANANA_WRONG = 3;
    this.FRAME_BANANA_RIGHT = 5;

    this.FRAME_ORANGE_NO_ANSWER = 6;
    this.FRAME_ORANGE_WRONG = 8;
    this.FRAME_ORANGE_RIGHT = 10;

    this.FRAME_BLUEBERRY_NO_ANSWER = 7;
    this.FRAME_BLUEBERRY_WRONG = 9;
    this.FRAME_BLUEBERRY_RIGHT = 11;

    this.APPLE = 0;
    this.BANANA = 1;
    this.ORANGE = 2;
    this.BLUEBERRY = 3;

    this.avatars = [];

    this.timerFrame = null;
    this.timerBar = null;
}

Hud.prototype = {
    preload : function() {
    },
    create : function() {
        this.initialize();
    },

    initialize : function() {
        // initialize avatars
        for (var i = 0; i < this.numPlayers; ++i) {
            var x = (1 + i) * 0.2 * this.gameManager.game.world.width;
            var y = 0.9 * this.gameManager.game.world.height;

            this.avatars.push(this.gameManager.game.add.sprite(x, y, 'avatars', this.frameForSprite(i)))
            this.avatars[i].anchor.setTo(0.5, 0.5);
        }

        // initialize timer
        var x = 0.5 * (this.gameManager.game.world.width - 256);
        var y = 0.1 * this.gameManager.game.world.height;
        this.timerFrame = this.gameManager.game.add.sprite(x, y, 'timers', 0);
        this.timerBar = this.gameManager.game.add.sprite(x, y, 'timers', 1);
        this.timerFrame.anchor.setTo(0, 0.5);
        this.timerBar.anchor.setTo(0, 0.5);
    },

    // This function is dumb. I'm dumb. If the avatar sprite sheet had some
    // semblence of order, this function wouldn't need to exist.
    frameForSprite : function(i) {
        if (i == this.APPLE) return this.FRAME_APPLE_NO_ANSWER;
        if (i == this.BANANA) return this.FRAME_BANANA_NO_ANSWER;
        if (i == this.ORANGE) return this.FRAME_ORANGE_NO_ANSWER;
        if (i == this.BLUEBERRY) return this.FRAME_BLUEBERRY_NO_ANSWER;
        return -1;
    },

    setRight : function(player) {
        this.avatars[player].frame = this.frameForSprite(player) + 4;
    },

    setWrong : function(player) {
        this.avatars[player].frame = this.frameForSprite(player) + 2;
    },

    reset :function(player) {
        this.avatars[player].frame = this.frameForSprite(player);
    },

    setTimer : function(scale) {
        this.timerBar.scale.set(scale, 1);
    },
}

Timer = function(gameManager) {
    this.gameManager = gameManager;
    this.t0 = 0;
    this.timeout = -1;
    this.started = false;
    this.callback = null;
}
Timer.prototype = {
    dt : function() {
        var dt = this.gameManager.game.time.totalElapsedSeconds() - this.t0;
        return dt;
    },

    update : function() {
        if (this.started) {
            if (this.dt() >= this.timeout) {
                this.started = false;
                if (this.callback) {
                    this.callback();
                }
            }
            this.gameManager.hud.setTimer(Math.max(0, 1 - this.percentTimedOut()));
        }
    },

    setTimeout : function(timeout, callback) {
        if (!this.started) {
            this.timeout = timeout;
            this.callback = callback || null;
            this.start();
        }
    },

    start : function() {
        if (!this.started) {
            this.t0 = this.gameManager.game.time.totalElapsedSeconds();
            this.started = true;
        }
    },
    
    percentTimedOut : function() {
        return this.dt()/this.timeout;
    }
}
