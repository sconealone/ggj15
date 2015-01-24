Game = function(game) {
    this.game = game;
    miniGame = null;
    this.hud = new Hud(this, 4);
    this.MIN_KEY_VAL = 0;
    this.MAX_KEY_VAL = 2;
    this.timer = new Timer(this);
    this.lives = new Lives(this);
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
        // miniGame = new KeyMatching(_this);
        miniGame = new ButtonMashing(_this);
		miniGame.preload();
// =======
//         miniGame = new KeyMatching(_this);

//         miniGame.preload();
// >>>>>>> 33712b769a2158d4cdd01e866527e25430d9baf9
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

    this.lifeCount = [];
}

Hud.prototype = {
    preload : function() {
        this.game.load.image('life', 'assets/life.png');
        this.game.load.spritesheet('avatars', 'assets/avatars.png', 32, 32);
        this.game.load.spritesheet('timer', 'assets/timer.png', 256, 32);
        this.game.load.spritesheet('directions', 'assets/directions.png', 32*3, 32);
        this.game.load.spritesheet('keys', 'assets/keys2.png', 256, 32);
    },
    create : function() {
        this.initialize();
    },

    initialize : function() {
        // initialize avatars
        for (var i = 0; i < this.numPlayers; ++i) {
            var x = (1 + i) * 0.2 * this.game.world.width;
            var y = 0.9 * this.game.world.height;

            this.avatars.push(this.game.add.sprite(x, y, 'avatars', this.frameForSprite(i)))
            this.avatars[i].anchor.setTo(0.5, 0.5);
        }

        // initialize timer
        var x = 0.5 * (this.game.world.width - 256);
        var y = 0.1 * this.game.world.height;
        this.timerFrame = this.game.add.sprite(x, y, 'timer', 0);
        this.timerBar = this.game.add.sprite(x, y, 'timer', 1);
        this.timerFrame.anchor.setTo(0, 0.5);
        this.timerBar.anchor.setTo(0, 0.5);

        // initialize lives
        for(var i = 0; i < this.game.lives.MAX_LIFE; ++i){
            var x = (10 + i * 30);
            var y = 0;
            console.log("adding life " + i);
            this.lifeCount.push(this.game.add.sprite(x, y, 'life'));

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
