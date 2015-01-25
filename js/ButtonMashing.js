ButtonMashing = function(game, data) {
    this.game = game;
    this.data = data;

    this.displayOrder = [];

    this.avatarSpritesheet = 'avatars'
    this.spritesheetPath = 'assets/avatars.png'
    this.frameWidth = 180;
    this.frameHeight = 200;
    this.dframeWidth = 32;
    this.dframeHeight = 32;

    this.avatarsY = 0.4*HEIGHT;
    this.directionsY = 0.55*HEIGHT;
    this.firstPlayerX = 0.20,
    this.secondPlayerX = 0.40,
    this.thirdPlayerX = 0.60,
    this.fourthPlayerX = 0.80;

    this.directionsSpriteSheet = 'directions';
    this.directionSpritesheetPath = 'assets/directions.png';

    this.timeout = 20;

    this.MIN_STROKE_BOUND = getRandomInt(10, 20);

    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);
}


ButtonMashing.prototype = {
    createAnswers: function() {
        var gm = GetGameManager(this.game);

        //players 0-3
        this.players  = [
            {   
                id: 0,
                keyFrame: 0,
                strokeCount: 0,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },
            {   
                id: 1,
                keyFrame: 1,
                strokeCount: 0,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },
            {   
                id: 2,
                keyFrame: 2,
                strokeCount: 0,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },
            {   
                id: 3,
                keyFrame: 3,
                strokeCount: 0,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },         
        ];


    },

    checkResponse: function() {

        var p1 = this.players[0],
            p2 = this.players[1],
            p3 = this.players[2],
            p4 = this.players[3];
        var gm = GetGameManager(this.game);

        for (var i=0; i < 3 ; i++) {
            if (gm.p1Resp[i].isDown && i != p1.answer) {
                this.hud.setWrong(0);
                gm.levelMaster.decreaseLife();
            }
            else if (gm.p2Resp[i].isDown && i != p2.answer) {
                this.hud.setWrong(1);
                gm.levelMaster.decreaseLife();
            }
            else if (gm.p3Resp[i].isDown && i != p3.answer) {
                this.hud.setWrong(2);
                gm.levelMaster.decreaseLife();
            }
            else if (gm.p4Resp[i].isDown && i != p4.answer) {
                this.hud.setWrong(3);
                gm.levelMaster.decreaseLife();
            }
        }

    },

    incrementStroke: function(player) {
        player.strokeCount >= this.MIN_STROKE_BOUND ? this.hud.setRight(player.id) : player.strokeCount += 1;
        console.log("player: " + player + "strock: " + player.strokeCount);
    },

    preload: function() {
        this.game.load.spritesheet(this.avatarSpritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight);
        this.game.load.spritesheet(this.directionsSpriteSheet, this.directionSpritesheetPath, this.dframeWidth, this.dframeHeight);
        this.game.load.image('bmbackground', 'assets/buttonmashingbg.png');

    },

    create: function() {
        // choose correct answer
        this.game.add.sprite(0,0,'bmbackground');
        this.createAnswers();

        // choose order of player iteration
        var p = [0, 1, 2, 3];
        this.displayOrder = generateOrder(p);

        var p1 = this.players[0],
            p2 = this.players[1],
            p3 = this.players[2],
            p4 = this.players[3];

        _this = this;

        var gm = GetGameManager(this.game);
        gm.p1Resp[p1.answer].onDown.add(function() {
            return _this.incrementStroke(p1);
        }, null);

        gm.p2Resp[p2.answer].onDown.add(function() {
            return _this.incrementStroke(p2);
        }, null);

        gm.p3Resp[p3.answer].onDown.add(function() {
            return _this.incrementStroke(p3);
        }, null);

        gm.p4Resp[p4.answer].onDown.add(function() {
            return _this.incrementStroke(p4);
        }, null);


        // draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();
        var _this = this;

        this.hud.create();
        this.timer.create();
        this.timer.setTimeout(this.timeout, _this.transition, _this);
    },

    update: function() {
        this.checkResponse();
        this.hud.update();
        this.timer.update();
    },

    shutdown: function() {
        this.timer.stop()
    },

    drawLayout : function() {

        this.shape1 = this.players[this.displayOrder[0]].keyFrame;
        this.shape2 = this.players[this.displayOrder[1]].keyFrame;
        this.shape3 = this.players[this.displayOrder[2]].keyFrame;
        this.shape4 = this.players[this.displayOrder[3]].keyFrame;

        this.p1AvatarSprite = this.game.add.sprite(WIDTH*this.firstPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape1);
        this.p2AvatarSprite = this.game.add.sprite(WIDTH*this.secondPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape2);
        this.p3AvatarSprite = this.game.add.sprite(WIDTH*this.thirdPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape3);
        this.p4AvatarSprite = this.game.add.sprite(WIDTH*this.fourthPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape4);

        this.p1AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p2AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p3AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p4AvatarSprite.anchor.setTo(0.5, 0.5);


        //direction answer key
        this.ans1 = this.players[this.displayOrder[0]].answer;
        this.ans2 = this.players[this.displayOrder[1]].answer;
        this.ans3 = this.players[this.displayOrder[2]].answer;
        this.ans4 = this.players[this.displayOrder[3]].answer;


        this.dir1Sprite = this.game.add.sprite(WIDTH*this.firstPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans1);
        this.dir2Sprite = this.game.add.sprite(WIDTH*this.secondPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans2);
        this.dir3Sprite = this.game.add.sprite(WIDTH*this.thirdPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans3);
        this.dir4Sprite = this.game.add.sprite(WIDTH*this.fourthPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans4);

        this.dir1Sprite.anchor.setTo(0.5, 0.5);
        this.dir2Sprite.anchor.setTo(0.5, 0.5);
        this.dir3Sprite.anchor.setTo(0.5, 0.5);
        this.dir4Sprite.anchor.setTo(0.5, 0.5);

    },

    transition: function(_this) {

        for (var i=0; i < _this.players.length; i++) {

            if (_this.players[i].strokeCount < _this.MIN_STROKE_BOUND) {
                _this.hud.setWrong(i);
                _this.game.levelMaster.decreaseLife();
            }
        }

    }

}

// Button mashing mini game where the fruits run away from something
ButtonMashingRun = function(game, data) {
    this.data = data;
    this.game = game;
    this.numPlayerStrokes = [0, 0, 0, 0];
    this.goal = 80;
    this.timeout = 10;
    this.x0 = WIDTH * 0.2;
    this.y0 = HEIGHT * 0.4;

    this.p1 = new ButtonMashing.Player(this.game, 0, this.x0, this.y0, 'blueberry');
    this.p2 = new ButtonMashing.Player(this.game, 0, this.x0 - 10, this.y0 + 60, 'apple');
    this.p3 = new ButtonMashing.Player(this.game, 0, this.x0 - 20, this.y0 + 120, 'pear');
    this.p4 = new ButtonMashing.Player(this.game, 0, this.x0 - 30, this.y0 + 180, 'banana');

    this.p1Count = null;
    this.p2Count = null;
    this.p3Count = null;
    this.p4Count = null;

    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);
}

ButtonMashingRun.prototype = {
    preload : function() {
		this.game.load.image('cellar', 'assets/cellar.png');
    },

    create : function() {
		this.game.add.sprite(0,0,'cellar');
        this.p1.create();
        this.p2.create();
        this.p3.create();
        this.p4.create();
        var gm = GetGameManager(this.game);
        var _this = this;
        this.p1Count = function(e) {
            _this.numPlayerStrokes[0] += 1;
        };
        this.p2Count = function(e) {
            _this.numPlayerStrokes[1] += 1;
        };
        this.p3Count = function(e) {
            _this.numPlayerStrokes[2] += 1;
        };
        this.p4Count = function(e) {
            _this.numPlayerStrokes[3] += 1;
        };
        gm.p1Resp[0].onDown.add(this.p1Count);
        gm.p1Resp[1].onDown.add(this.p1Count);
        gm.p1Resp[2].onDown.add(this.p1Count);

        gm.p2Resp[0].onDown.add(this.p2Count);
        gm.p2Resp[1].onDown.add(this.p2Count);
        gm.p2Resp[2].onDown.add(this.p2Count);

        gm.p3Resp[0].onDown.add(this.p3Count);
        gm.p3Resp[1].onDown.add(this.p3Count);
        gm.p3Resp[2].onDown.add(this.p3Count);

        gm.p4Resp[0].onDown.add(this.p4Count);
        gm.p4Resp[1].onDown.add(this.p4Count);
        gm.p4Resp[2].onDown.add(this.p4Count);
            
        this.hud.create()
        this.timer.create()
        this.timer.setTimeout(10, this.transition, _this);
    },

    update : function() {
        this.hud.update();
        this.timer.update();
        this.p1.percentDone(this.numPlayerStrokes[0]/(this.goal + 30));
        this.p2.percentDone(this.numPlayerStrokes[1]/(this.goal + 30));
        this.p3.percentDone(this.numPlayerStrokes[2]/(this.goal + 30));
        this.p4.percentDone(this.numPlayerStrokes[3]/(this.goal + 30));
    },

    shutdown: function() {
        this.timer.stop()
    },


    transition : function(_this) {
        for (var i=0; i < 4; ++i) {
            if (_this.numPlayerStrokes[i] < _this.goal)
                _this.hud.setWrong(i);
            else
                _this.hud.setRight(i);
        }

        var gm = GetGameManager();

        gm.p1Resp[0].onDown.remove(_this.p1Count);
        gm.p1Resp[1].onDown.remove(_this.p1Count);
        gm.p1Resp[2].onDown.remove(_this.p1Count);

        gm.p2Resp[0].onDown.remove(_this.p2Count);
        gm.p2Resp[1].onDown.remove(_this.p2Count);
        gm.p2Resp[2].onDown.remove(_this.p2Count);

        gm.p3Resp[0].onDown.remove(_this.p3Count);
        gm.p3Resp[1].onDown.remove(_this.p3Count);
        gm.p3Resp[2].onDown.remove(_this.p3Count);

        gm.p4Resp[0].onDown.remove(_this.p4Count);
        gm.p4Resp[1].onDown.remove(_this.p4Count);
        gm.p4Resp[2].onDown.remove(_this.p4Count);
        
    }
}

ButtonMashing.Player = function(game, playerNumber, x, y, key) {
    this.game = game;
    this.playerNumber = playerNumber;
    this.sprite = null;
    this.x0 = x;
    this.y0 = y;
    this.key = key;
}

ButtonMashing.Player.prototype = {
    preload : function() {
    },

    create : function() {
        this.sprite = this.game.add.sprite(this.x0, this.y0, this.key, 3)
        this.sprite.animations.add('right', [4, 5, 6], 20, true);
        this.sprite.animations.play('right');
        this.tween = this.game.add.tween(this.sprite);
    },

    update : function() {
    },


    percentDone : function(percent) {
        var distance = WIDTH + 100 - this.x0;
        this.sprite.x = this.x0 + distance * percent;
    }
}
