Game = function(game) {
	this.game = game;
	miniGame = null;
    this.hud = new Hud(this, 4);

    this.MIN_KEY_VAL = 0;
    this.MAX_KEY_VAL = 2;

}

Game.prototype = {
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
        miniGame = new KeyMatching(_this);

		miniGame.preload();
        this.hud.preload();
	},

	create: function() {
        //initialize the keys for each player
        this.initializeKeys();

		miniGame.create();
        this.hud.create();
	},

	update: function() {
		miniGame.update();
	},
}

// Hud is the player avatars + time countdown
Hud = function(game, numPlayers) {
    this.game = game;

    // constants
    this.NO_ANSWER = 0;
    this.WRONG = 1;
    this.RIGHT = 2;

    this.numPlayers = numPlayers;

    // sprites
    this.spritesheet = 'avatars'
    this.spritesheetPath = 'assets/avatars.png'
    this.frameWidth = 32;
    this.frameHeight = 32;

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
}

Hud.prototype = {
    preload : function() {
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight)
    },
    create : function() {
        this.initialize();
    },

    initialize : function() {
        for (var i = 0; i < this.numPlayers; ++i) {
            var x = (1 + i) * 0.2 * this.game.world.width;
            var y = 0.9 * this.game.world.height;

            this.avatars.push(this.game.add.sprite(x, y, this.spritesheet, this.frameForSprite(i)))
            this.avatars[i].anchor.setTo(0.5, 0.5);
        }
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
    
}
