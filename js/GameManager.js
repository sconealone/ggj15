// This file is super buggy
// Don't call it too early
_gameManager = null;
GetGameManager = function(game, levelMaster) {
    if (_gameManager == null) {
        _gameManager = new GameManager(game, levelMaster);
        _gameManager.preload();
        _gameManager.create();
    }
    return _gameManager;
}

GameManager = function(game, levelMaster) {
	this.game = game;
    var _this = this;
    this.WIDTH = 1280;
    this.HEIGHT = 720;
	this.miniGame = null;
    this.MIN_KEY_VAL = 0;
    this.MAX_KEY_VAL = 2;
    this.levelMaster = levelMaster;
    this.FAIL_SOUNDS = ["smallViolin", "wahWah", "slowClap"];
    this.FAIL_COMPLAIN_SOUNDS = ["grumpyBanana", "grumpyBlueBerry", "grumpyPear", "GrumpyApple"];
    this.FAIL_EMBARRASSED_SOUNDS = ["embBanana", "embBlueBerry", "embApple", "emPear"];
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
	},

    create: function() {
        //initialize the keys for each player
        this.initializeKeys();

	},

	update: function() {
    },

}

// Hud is the player avatars + time countdown
Hud = function(game, numPlayers) {
    this.game = game;

    // constants
    this.NO_ANSWER = 0;
    this.WRONG = 1;
    this.RIGHT = 2;

    this.numPlayers = numPlayers || 4;

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
    this.lifegroup = null;
}

Hud.prototype = {
    preload : function() {
        this.game.load.spritesheet('timers', 'assets/timer.png', 438, 128);
        this.game.load.spritesheet('avatars', 'assets/avatars.png', 180, 200);
    },
    create : function() {
        this.initialize();
    },
    update : function() {
    },

    initialize : function() {
        // initialize avatars
        for (var i = 0; i < this.numPlayers; ++i) {
            var x = (1 + i) * 0.2 * WIDTH;
            var y = 0.85 * HEIGHT;

            this.avatars.push(this.game.add.sprite(x, y, 'avatars', this.frameForSprite(i)))
            this.avatars[i].anchor.setTo(0.5, 0.5);
        }

        // initialize timer
        var x = 0.005 * WIDTH;
        var y = 0.1 * HEIGHT;
        this.timerBar = this.game.add.sprite(x+50, y, 'timers', 1);
        this.timerFrame = this.game.add.sprite(x, y, 'timers', 0);
        this.timerBar.anchor.setTo(0, 0.5);
        this.timerFrame.anchor.setTo(0, 0.5);


        // initialize lives
        var gm = GetGameManager(this.game)
        this.lifegroup = this.game.add.group();
/*        for(var i = 0; i < gm.levelMaster.MAX_LIVES; ++i){
            var x = 0.87 * this.game.width - i * 125;
            var y = 0.02 * this.game.height;
            this.lifeCount.push(this.game.add.sprite(x, y, 'life'));
        }*/
        for(var i = 0; i < gm.levelMaster.MAX_LIVES; ++i){
            var x = 0.87 * this.game.width - i * 125;
            var y = 0.02 * this.game.height;
            var l = this.lifegroup.create(x, y, 'life', 0);
        }

    },

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

Timer = function(game, hud) {
    this.game = game;
    this.hud = hud || null;
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
            if (this.hud)
                this.hud.setTimer(Math.max(0, 1 - this.percentTimedOut()));
        }
    },
    create : function() {
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
    },

    stop : function (callback) {
        if (this.started) {
            this.started = false;
            if (callback) {
                this.callback(this.param);
            }
        }
    },
}
