KeyMatching = function(game, data) {
    this.game = game;
	this.data = data;
    this.displayOrder = [];

    this.avatarSpritesheet = 'avatars'
    this.spritesheetPath = 'assets/avatars.png'
    this.frameWidth = 180;
    this.frameHeight = 200;
    this.dframeWidth = 32;
    this.dframeHeight = 32;

    this.avatarsY = 0.35*game.height;
    this.directionsY = 0.5*game.height;
    this.firstPlayerX = 0.20,
    this.secondPlayerX = 0.40,
    this.thirdPlayerX = 0.60,
    this.fourthPlayerX = 0.80;

    this.directionsSpriteSheet = 'directions';
    this.directionSpritesheetPath = 'assets/directions.png';

    this.timeout = 2;
}


KeyMatching.prototype = {
    createAnswers: function() {
        var gm = GetGameManager(this.game);

        //players 0-3
        this.players  = [
            {
                keyFrame: 0,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },
            {
                keyFrame: 1,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },
            {
                keyFrame: 2,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },
            {
                keyFrame: 3,
                answer: getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL)
            },         
        ];


    },

    checkResponse: function() {
        var gm = GetGameManager(this.game);
        for (var i=0; i < 3 ; i++) {
            if (!gm.p1Resp.responded && gm.p1Resp[i].isDown) {
                gm.p1Resp.responded = true;

                if (i == this.players[0].answer) {
                    console.log("p1 pass") 
                    gm.hud.setRight(0);
                } else {
                    console.log("p1 fail");
                    gm.hud.setWrong(0);
                    gm.levelMaster.decreaseLife();
                }
            }

            if (!gm.p2Resp.responded && gm.p2Resp[i].isDown) {
                gm.p2Resp.responded = true;

                if (i == this.players[1].answer) {
                    console.log("p2 pass") 
                    gm.hud.setRight(1);
                } else {
                    console.log("p2 fail");
                    gm.hud.setWrong(1);
                    gm.levelMaster.decreaseLife();
                }
            }

            if (!gm.p3Resp.responded && gm.p3Resp[i].isDown) {
                gm.p3Resp.responded = true;

                if (i == this.players[2].answer) {
                    console.log("p3 pass") 
                    gm.hud.setRight(2);
                } else {
                    console.log("p3 fail");
                    gm.levelMaster.decreaseLife();
                    gm.hud.setWrong(2);
                }
            }

            if (!gm.p4Resp.responded && gm.p4Resp[i].isDown) {
                gm.p4Resp.responded = true;

                if (i == this.players[3].answer) {
                    console.log("p4 pass") 
                    gm.hud.setRight(3);
                } else {
                    console.log("p4 fail");
                    gm.levelMaster.decreaseLife();
                    gm.hud.setWrong(3);
                }
            }                                    
        }

    },

    preload: function() {
        this.game.load.spritesheet(this.directionsSpriteSheet, this.directionSpritesheetPath, this.dframeWidth, this.dframeHeight);

    },

    create: function() {
        var gm = GetGameManager(this.game)
        console.log("creating multi player key matching");

        // choose correct answer
        this.createAnswers();
        console.log("p1: " + this.players[0].answer);
        console.log("p2: " + this.players[1].answer);
        console.log("p3: " + this.players[2].answer);
        console.log("p4: " + this.players[3].answer);

        // choose order of player iteration
        var p = [0, 1, 2, 3];
        this.displayOrder = generateOrder(p);

        // draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();
        var _this = this;
        gm.timer.setTimeout(this.timeout, this.transition, _this);
    },

    update: function() {
        var gm = GetGameManager(this.game);
        this.checkResponse();
        gm.update();
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
        var gm = GetGameManager(_this.game)
        if (!gm.p1Resp.responded) {
            gm.hud.setWrong(0);
        }

        if (!gm.p2Resp.responded) {
            gm.hud.setWrong(1);
        }

        if (!gm.p3Resp.responded) {
            gm.hud.setWrong(2);
        }

        if (!gm.p4Resp.responded) {
            gm.hud.setWrong(3);
        }

        if (!gm.p1Resp.responded || !gm.p2Resp.responded || !gm.p3Resp.responded ||
            !gm.p4Resp.responded) {
            gm.levelMaster.decreaseLife();
        }
    }

}
