ShapeMatching = function(game) {
    this.game = game;

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

    // override these
    // Actually it would be better if we could pass in a struct for each type of mini game
    this.shapeSpriteX1 = 0.25*game.world.width;
    this.shapeSpriteY1 = 0.5*game.world.height;

    this.shapeSpriteX2 = 0.5*game.world.width;
    this.shapeSpriteY2 = 0.1*game.world.height;

    this.shapeSpriteX3 = 0.75*game.world.width;
    this.shapeSpriteY3 = 0.5*game.world.height;

    this.answerSpriteX = 0.5*game.world.width;
    this.answerSpriteY = 0.5*game.world.height;

    this.timeout = 5;
}


ShapeMatching.prototype = {

    checkResponse: function() {
        for (var i=0; i < 3 ; i++) {
            if (!this.game.p1Resp.responded && this.game.p1Resp[i].isDown) {
                this.game.p1Resp.responded = true;

                if (this.order[i] == this.answer) {
                    console.log("p1 pass") 
                    this.game.hud.setRight(0);
                } else {
                    console.log("p1 fail");
                    this.game.hud.setWrong(0);
                    this.game.levelMaster.decreaseLife();
                }
            }

            if (!this.game.p2Resp.responded && this.game.p2Resp[i].isDown) {
                this.game.p2Resp.responded = true;

                if (this.order[i] == this.answer) {
                    console.log("p2 pass") 
                    this.game.hud.setRight(1);
                } else {
                    console.log("p2 fail");
                    this.game.hud.setWrong(1);
                    this.game.levelMaster.decreaseLife();
                }
            }

            if (!this.game.p3Resp.responded && this.game.p3Resp[i].isDown) {
                this.game.p3Resp.responded = true;

                if (this.order[i] == this.answer) {
                    console.log("p3 pass") 
                    this.game.hud.setRight(2);
                } else {
                    console.log("p3 fail");
                    this.game.hud.setWrong(2);
                    this.game.levelMaster.decreaseLife();
                }
            }

            if (!this.game.p4Resp.responded && this.game.p4Resp[i].isDown) {
                this.game.p4Resp.responded = true;

                if (this.order[i] == this.answer) {
                    console.log("p4 pass") 
                    this.game.hud.setRight(3);
                } else {
                    console.log("p4 fail");
                    this.game.hud.setWrong(3);
                    this.game.levelMaster.decreaseLife();
                }
            }                                    
        }

    },

    preload: function() {
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight)
        this.game.load.image('shapeMatchingBK', 'assets/ShapeMatchingbk.png');
    },

    create: function() {
        console.log("creating matching");

        // choose correct answer
        this.answer = getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL);
        console.log(this.answer);

        // choose order of shapes
        var a = [0, 1, 2];
        this.order = generateOrder(a);
        this.shape1 = this.order[0];
        this.shape2 = this.order[1];
        this.shape3 = this.order[2];

        console.log(this.order);

        // draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();

        // Start timer
        var _this = this;
        this.game.timer.setTimeout(this.timeout, this.transition, _this);
    },

    update: function() {
        this.checkResponse();
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

        if (!_this.game.p1Resp.responded) {
            _this.game.hud.setWrong(0);
        }

        if (!_this.game.p2Resp.responded) {
            _this.game.hud.setWrong(1);
        }

        if (!_this.game.p3Resp.responded) {
            _this.game.hud.setWrong(2);
        }

        if (!_this.game.p4Resp.responded) {
            _this.game.hud.setWrong(3);
        }

        if (!_this.game.p1Resp.responded || !_this.game.p2Resp.responded || !_this.game.p3Resp.responded ||
            !_this.game.p4Resp.responded) {
            _this.game.levelMaster.decreaseLife();
        }

        console.log("transition");
    },

}
