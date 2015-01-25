Game = function(game) {
	this.game = game;
    var _this = this;
	this.miniGame = null;
    this.hud = new Hud(_this, 4);
    this.MIN_KEY_VAL = 0;
    this.MAX_KEY_VAL = 2;
    this.timer = new Timer(_this);
    this.lives = new Lives(_this);
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

    setPlayerRespond : function(playerNumber) {
        var resp = null;
        if (playerNumber == 0) {
            resp = this.p1Resp;
        } else if (playerNumber == 1) {
            resp = this.p2Resp;
        } else if (playerNumber == 2) {
            resp = this.p3Resp;
        } else if (playerNumber == 3) {
            resp = this.p4Resp;
        }
        resp.responded = true;
    },

    getPlayerRespond : function(playerNumber) {
        var resp = null;
        if (playerNumber == 0) {
            resp = this.p1Resp;
        } else if (playerNumber == 1) {
            resp = this.p2Resp;
        } else if (playerNumber == 2) {
            resp = this.p3Resp;
        } else if (playerNumber == 3) {
            resp = this.p4Resp;
        }
        return resp.responded;
    },

    getPlayerRespondKey : function(playerNumber, keyNumber) {
        if (playerNumber == 0) {
            return this.p1Resp[keyNumber]
        } else if (playerNumber == 1) {
            return this.p2Resp[keyNumber]
        } else if (playerNumber == 2) {
            return this.p3Resp[keyNumber]
        } else if (playerNumber == 3) {
            return this.p4Resp[keyNumber]
        }
    },


	preload: function() {
		_this = this;

		this.miniGame = new ShapeMatching(_this);
        //this.miniGame = new KeyMatching(_this);
        //this.miniGame = new ColorTile(_this);
        //this.miniGame = new ButtonMashing(_this);
        //this.miniGame = new CollisionGame(_this);

		this.miniGame.preload();
        this.hud.preload();
    },

    create: function() {
        //initialize the keys for each player
        this.initializeKeys();
        this.hud.create();

        this.miniGame.create();
    },

    update: function() {
        this.miniGame.update();
        this.timer.update();
        this.lives.update();
    }
}

// Hud is the player avatars + time countdown
Hud = function(game, numPlayers) {
    this.game = game;

    // constants
    this.NO_ANSWER = 0;
    this.WRONG = 1;
    this.RIGHT = 2;

    this.numPlayers = numPlayers;

    this.FRAME_BLUEBERRY_NO_ANSWER = 0;
    this.FRAME_BLUEBERRY_WRONG = 8;
    this.FRAME_BLUEBERRY_RIGHT = 4;

    this.FRAME_APPLE_NO_ANSWER = 1;
    this.FRAME_APPLE_WRONG = 9;
    this.FRAME_APPLE_RIGHT = 5;

    this.FRAME_PEAR_NO_ANSWER = 2;
    this.FRAME_PEAR_WRONG = 10;
    this.FRAME_PEAR_RIGHT = 6;

    this.FRAME_BANANA_NO_ANSWER = 3;
    this.FRAME_BANANA_WRONG = 11;
    this.FRAME_BANANA_RIGHT = 7;

    this.BLUEBERRY = 0;
    this.APPLE = 1;
    this.PEAR = 2;
    this.BANANA = 3;

    this.avatars = [];

    this.timerFrame = null;
    this.timerBar = null;

    this.lifeCount = [];
}

Hud.prototype = {
    preload : function() {
        this.game.load.image('life', 'assets/life.png');
        this.game.load.spritesheet('avatars', 'assets/avatars.png', 180, 200);
        this.game.load.spritesheet('timer', 'assets/timer.png', 438, 128);
        this.game.load.spritesheet('directions', 'assets/directions.png', 32*3, 32);
        this.game.load.spritesheet('keys', 'assets/keys.png', 120, 300);
        this.game.load.spritesheet('words', 'assets/colorWords.png', 128, 64);
        this.game.load.image('shapeMatchingBK', 'assets/ShapeMatchingbk.png');
    },
    create : function() {
        this.initialize();
    },

    initialize : function() {
        // initialize avatars
        for (var i = 0; i < this.numPlayers; ++i) {
            var x = (1 + i) * 0.2 * this.game.world.width;
            var y = 0.85 * this.game.world.height;

            this.avatars.push(this.game.add.sprite(x, y, 'avatars', this.frameForSprite(i)))
            this.avatars[i].anchor.setTo(0.5, 0.5);
        }

        // initialize timer
        //var x = 0.65 * this.game.world.width;
        var x = 0.005 * this.game.world.width;
        var y = 0.1 * this.game.world.height;
        this.timerBar = this.game.add.sprite(x+50, y, 'timer', 1);
        this.timerFrame = this.game.add.sprite(x, y, 'timer', 0);
        this.timerFrame.anchor.setTo(0, 0.5);
        this.timerBar.anchor.setTo(0, 0.5);


        // initialize lives
        for(var i = 0; i < this.game.lives.MAX_LIFE; ++i){
            var x = 0.87 * this.game.world.width - i * 125;
            var y = 0.02 * this.game.world.height;
            console.log("adding life " + i);
            this.lifeCount.push(this.game.add.sprite(x, y, 'life'));

        }
    },

    // This function is dumb. I'm dumb. If the avatar sprite sheet had some
    // semblence of order, this function wouldn't need to exist.
    frameForSprite : function(i) {
        if (i == this.APPLE) return this.FRAME_APPLE_NO_ANSWER;
        if (i == this.BANANA) return this.FRAME_BANANA_NO_ANSWER;
        if (i == this.PEAR) return this.FRAME_PEAR_NO_ANSWER;
        if (i == this.BLUEBERRY) return this.FRAME_BLUEBERRY_NO_ANSWER;
        return -1;
    },

    setRight : function(player) {
        this.avatars[player].frame = this.frameForSprite(player) + 4;
    },

    setWrong : function(player) {
        this.avatars[player].frame = this.frameForSprite(player) + 8;
    },

    reset :function(player) {
        this.avatars[player].frame = this.frameForSprite(player);
    },

    setTimer : function(scale) {
        this.timerBar.scale.set(scale, 1);
    },
}

Timer = function(game) {
    this.game = game;
    this.t0 = 0;
    this.timeout = -1;
    this.started = false;
    this.callback = null;
}
Timer.prototype = {
    dt : function() {
        var dt = this.game.time.totalElapsedSeconds() - this.t0;
        return dt;
    },

    update : function() {
        if (this.started) {
            if (this.dt() >= this.timeout) {
                this.started = false;
                if (this.callback) {
                    this.callback(this.param);
                }
            }
            this.game.hud.setTimer(Math.max(0, 1 - this.percentTimedOut()));
        }
    },

    setTimeout : function(timeout, callback, param) {

        if (!this.started) {
            this.timeout = timeout;
            this.callback = callback || null;
            this.param = param || null;
            this.start();
        }
    },

    start : function() {
        if (!this.started) {
            this.t0 = this.game.time.totalElapsedSeconds();
            this.started = true;
        }
    },

    percentTimedOut : function() {
        return this.dt()/this.timeout;
    }
}

Lives = function(game) {
    this.game = game;
    this.MAX_LIFE = 3;

}
Lives.prototype = {

    update : function(){

    }
}
