ButtonMashing = function(game) {
    this.game = game;

    this.displayOrder = [];

    this.avatarSpritesheet = 'avatars'
    this.spritesheetPath = 'assets/avatars.png'
    this.frameWidth = 32;
    this.frameHeight = 32;

    this.avatarsY = 0.25*game.world.height;
    this.directionsY = 0.35*game.world.height;
    this.firstPlayerX = 0.20,
    this.secondPlayerX = 0.40,
    this.thirdPlayerX = 0.60,
    this.fourthPlayerX = 0.80;

    this.directionsSpriteSheet = 'directions';
    this.directionSpritesheetPath = 'assets/directions.png';

    this.timeout = 10;

    this.MIN_STROKE_BOUND = getRandomInt(10, 20);
}


ButtonMashing.prototype = {
    createAnswers: function() {

        //players 0-3
        this.players  = [
            {   
                id: 1,
                keyFrame: 0,
                strokeCount: 0,
                answer: getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL)
            },
            {   
                id: 2,
                keyFrame: 1,
                strokeCount: 0,
                answer: getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL)
            },
            {   
                id: 3,
                keyFrame: 6,
                strokeCount: 0,
                answer: getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL)
            },
            {   
                id: 4,
                keyFrame: 7,
                strokeCount: 0,
                answer: getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL)
            },         
        ];


    },

    checkResponse: function() {

        var p1 = this.players[0],
            p2 = this.players[1],
            p3 = this.players[2],
            p4 = this.players[3];

        for (var i=0; i < 3 ; i++) {
            if (this.game.p1Resp[i].isDown && i != p1.answer) {
                this.game.hud.setWrong(0);
            }
            else if (this.game.p2Resp[i].isDown && i != p2.answer) {
                this.game.hud.setWrong(1);
            }
            else if (this.game.p3Resp[i].isDown && i != p3.answer) {
                this.game.hud.setWrong(2);
            }
            else if (this.game.p4Resp[i].isDown && i != p4.answer) {
                this.game.hud.setWrong(3);
            }
        }

    },

    incrementStroke: function(player) {
        player.strokeCount >= this.MIN_STROKE_BOUND ? this.game.hud.setRight(player.id) : player.strokeCount += 1;
        console.log(player);
    },

    preload: function() {
        this.game.load.spritesheet(this.avatarSpritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight);
        this.game.load.spritesheet(this.directionsSpriteSheet, this.directionSpritesheetPath, this.frameWidth, this.frameHeight);

    },

    create: function() {
        console.log("creating multi player button mashing");

        // choose correct answer
        this.createAnswers();
        console.log("p1: " + this.players[0].answer);
        console.log("p2: " + this.players[1].answer);
        console.log("p3: " + this.players[2].answer);
        console.log("p4: " + this.players[3].answer);

        // choose order of player iteration
        var p = [0, 1, 2, 3];
        this.displayOrder = generateOrder(p);

        var p1 = this.players[0],
            p2 = this.players[1],
            p3 = this.players[2],
            p4 = this.players[3];

        _this = this;

        this.game.p1Resp[p1.answer].onDown.add(function() {
            return _this.incrementStroke(p1);
        }, null);

        this.game.p2Resp[p2.answer].onDown.add(function() {
            return _this.incrementStroke(p2);
        }, null);

        this.game.p3Resp[p3.answer].onDown.add(function() {
            return _this.incrementStroke(p3);
        }, null);

        this.game.p4Resp[p4.answer].onDown.add(function() {
            return _this.incrementStroke(p4);
        }, null);


        // draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();
        var _this = this;
        this.game.timer.setTimeout(this.timeout, _this.transition, _this);


    },

    update: function() {
        this.checkResponse();
    },

    drawLayout : function() {

        this.shape1 = this.players[this.displayOrder[0]].keyFrame;
        this.shape2 = this.players[this.displayOrder[1]].keyFrame;
        this.shape3 = this.players[this.displayOrder[2]].keyFrame;
        this.shape4 = this.players[this.displayOrder[3]].keyFrame;

        this.p1AvatarSprite = this.game.add.sprite(this.game.world.width*this.firstPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape1);
        this.p2AvatarSprite = this.game.add.sprite(this.game.world.width*this.secondPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape2);
        this.p3AvatarSprite = this.game.add.sprite(this.game.world.width*this.thirdPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape3);
        this.p4AvatarSprite = this.game.add.sprite(this.game.world.width*this.fourthPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape4);

        this.p1AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p2AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p3AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p4AvatarSprite.anchor.setTo(0.5, 0.5);


        //direction answer key
        this.ans1 = this.players[this.displayOrder[0]].answer;
        this.ans2 = this.players[this.displayOrder[1]].answer;
        this.ans3 = this.players[this.displayOrder[2]].answer;
        this.ans4 = this.players[this.displayOrder[3]].answer;

        console.log([this.ans1, this.ans2, this.ans3, this.ans4]);


        this.dir1Sprite = this.game.add.sprite(this.game.world.width*this.firstPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans1);
        this.dir2Sprite = this.game.add.sprite(this.game.world.width*this.secondPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans2);
        this.dir3Sprite = this.game.add.sprite(this.game.world.width*this.thirdPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans3);
        this.dir4Sprite = this.game.add.sprite(this.game.world.width*this.fourthPlayerX, this.directionsY, this.directionsSpriteSheet, this.ans4);

        this.dir1Sprite.anchor.setTo(0.5, 0.5);
        this.dir2Sprite.anchor.setTo(0.5, 0.5);
        this.dir3Sprite.anchor.setTo(0.5, 0.5);
        this.dir4Sprite.anchor.setTo(0.5, 0.5);

    },

    transition: function(_this) {

        for (var i=0; i < _this.players.length; i++) {
            console.log(_this.players[i].strokeCount);
            console.log(_this.MIN_STROKE_BOUND);

            if (_this.players[i].strokeCount < _this.MIN_STROKE_BOUND) {
                _this.game.hud.setWrong(i);
                console.log(i + " didn't make it");
            }
        }

        console.log("transition");
    }

}