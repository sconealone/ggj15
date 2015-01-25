ShapeMatching = function(game, data) {
    this.game = game;
    this.data = data;

    this.shape1 = -1;
    this.shape2 = -1;
    this.shape3 = -1;
    this.answer = -1;

    this.order = []

    this.shapeSprite1 = null;
    this.shapeSprite2 = null;
    this.shapeSprite3 = null;
    this.answerSprite = null;

    this.spritesheet = 'keys';
    this.spritesheetPath = 'assets/keys.png';
    this.frameWidth = 120;
    this.frameHeight = 300;

    var height = 720;
    var width = 1280;
    // override these
    // Actually it would be better if we could pass in a struct for each type of mini game
    this.shapeSpriteX1 = 0.25*width;
    this.shapeSpriteY1 = 0.5*height;

    this.shapeSpriteX2 = 0.5*width;
    this.shapeSpriteY2 = 0.1*height;

    this.shapeSpriteX3 = 0.75*width;
    this.shapeSpriteY3 = 0.5*height;

    this.answerSpriteX = 0.5*width;
    this.answerSpriteY = 0.5*height;

    this.timeout = 5;
    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);

    this.blame = false;
}


ShapeMatching.prototype = {

    checkResponse: function() {
        var gm = GetGameManager(this.game);
        for (var i=0; i < 3 ; i++) {
            if (!gm.p1Resp.responded && gm.p1Resp[i].isDown) {
                gm.p1Resp.responded = true;

                if (this.order[i] == this.answer) {
                    this.hud.setRight(0);
                } else {
                    this.hud.setWrong(0);
                    this.blame = true;
                    //gm.levelMaster.decreaseLife();
                }
            }

            if (!gm.p2Resp.responded && gm.p2Resp[i].isDown) {
                gm.p2Resp.responded = true;

                if (this.order[i] == this.answer) {
                    this.hud.setRight(1);
                } else {
                    this.hud.setWrong(1);
                    this.blame = true;
                    //gm.levelMaster.decreaseLife();
                }
            }

            if (!gm.p3Resp.responded && gm.p3Resp[i].isDown) {
                gm.p3Resp.responded = true;

                if (this.order[i] == this.answer) {
                    this.hud.setRight(2);
                } else {
                    this.hud.setWrong(2);
                    this.blame = true;
                    //gm.levelMaster.decreaseLife();
                }
            }

            if (!gm.p4Resp.responded && gm.p4Resp[i].isDown) {
                gm.p4Resp.responded = true;

                if (this.order[i] == this.answer) {
                    this.hud.setRight(3);
                } else {
                    this.hud.setWrong(3);
                    this.blame = true;
                    //gm.levelMaster.decreaseLife();
                }
            }
            
            if (gm.p1Resp.responded && gm.p2Resp.responded && gm.p3Resp.responded && gm.p4Resp.responded
                && this.blame) {
                gm.levelMaster.decreaseLife(null);
            }

        }

    },

    preload: function() {
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight)
        this.game.load.image('shapeMatchingBK', 'assets/ShapeMatchingbk.png');
    },

    create: function() {
        // choose correct answer
        var gm = GetGameManager(this.game)
        this.answer = getRandomInt(gm.MIN_KEY_VAL, gm.MAX_KEY_VAL);

        // choose order of shapes
        var a = [0, 1, 2];
        this.order = generateOrder(a);
        this.shape1 = this.order[0];
        this.shape2 = this.order[1];
        this.shape3 = this.order[2];


        // draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();

        // Start timer
        var _this = this;
        this.hud.create();
        this.timer.create();
        this.timer.setTimeout(this.timeout, this.transition, _this);
    },

    update: function() {
        this.hud.update();
        this.timer.update();
        this.checkResponse();
    },

    shutdown: function() {
        this.timer.stop()
    },


    drawLayout : function() {
        this.game.add.sprite(0,0,'shapeMatchingBK');
        this.shapeSprite1 = this.game.add.sprite(this.shapeSpriteX1, this.shapeSpriteY1, this.spritesheet, this.shape1);
        this.shapeSprite2 = this.game.add.sprite(this.shapeSpriteX2, this.shapeSpriteY2, this.spritesheet, this.shape2);
        this.shapeSprite3 = this.game.add.sprite(this.shapeSpriteX3, this.shapeSpriteY3, this.spritesheet, this.shape3);
        this.answerSprite = this.game.add.sprite(this.answerSpriteX, this.answerSpriteY, this.spritesheet, this.answer + 3);

        this.shapeSprite1.anchor.setTo(0.5, 0.5);
        this.shapeSprite1.scale.set(0.7, 0.7);
        this.shapeSprite2.anchor.setTo(0.5, 0.5);
        this.shapeSprite2.scale.set(0.7, 0.7);
        this.shapeSprite2.angle = -90;
        this.shapeSprite3.anchor.setTo(0.5, 0.5);
        this.shapeSprite3.scale.set(0.7, 0.7);
        this.shapeSprite3.angle = 180;
        this.answerSprite.anchor.setTo(0.5, 0.5);
        //this.answerSprite.scale.set(2, 2);
    },

    transition: function(_this) {

        var gm = GetGameManager(_this.game);
        if (!gm.p1Resp.responded) {
            this.hud.setWrong(0);
        }

        if (!gm.p2Resp.responded) {
            this.hud.setWrong(1);
        }

        if (!gm.p3Resp.responded) {
            this.hud.setWrong(2);
        }

        if (!gm.p4Resp.responded) {
            this.hud.setWrong(3);
        }

        if (!gm.p1Resp.responded || !gm.p2Resp.responded || !gm.p3Resp.responded ||
            !gm.p4Resp.responded) {
            gm.levelMaster.decreaseLife();
        } else {
            gm.levelMaster.nextLevel();
        }

    },

}
