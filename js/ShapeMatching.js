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
    this.spritesheetPath = 'assets/keys2.png';
    this.frameWidth = 32;
    this.frameHeight = 32;

    // override these
    // Actually it would be better if we could pass in a struct for each type of mini game
    this.shapeSpriteX1 = 0.25*game.world.width;
    this.shapeSpriteY1 = 0.5*game.world.height;

    this.shapeSpriteX2 = 0.5*game.world.width;
    this.shapeSpriteY2 = 0.25*game.world.height;

    this.shapeSpriteX3 = 0.75*game.world.width;
    this.shapeSpriteY3 = 0.5*game.world.height;

    this.answerSpriteX = 0.5*game.world.width;
    this.answerSpriteY = 0.5*game.world.height;

    this.timeout = 1;
}

// helpers and sh1t
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOrder(o) {
    for (var i = o.length - 1; i >= 0; --i) {
        var randomIndex = getRandomInt(0, i);
        // swap
        var tmp = o[i];
        o[i] = o[randomIndex];
        o[randomIndex] = tmp;
    }
    return o;
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
                }
            }                                    
        }

    },

    preload: function() {
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight)

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
        this.game.timer.setTimeout(this.timeout, this.transition);
    },

    update: function() {
        this.checkResponse();
    },


    drawLayout : function() {
        this.shapeSprite1 = this.game.add.sprite(this.shapeSpriteX1, this.shapeSpriteY1, this.spritesheet, this.shape1);
        this.shapeSprite2 = this.game.add.sprite(this.shapeSpriteX2, this.shapeSpriteY2, this.spritesheet, this.shape2);
        this.shapeSprite3 = this.game.add.sprite(this.shapeSpriteX3, this.shapeSpriteY3, this.spritesheet, this.shape3);
        this.answerSprite = this.game.add.sprite(this.answerSpriteX, this.answerSpriteY, this.spritesheet, this.answer);

        this.shapeSprite1.anchor.setTo(0.5, 0.5);
        this.shapeSprite2.anchor.setTo(0.5, 0.5);
        this.shapeSprite3.anchor.setTo(0.5, 0.5);
        this.answerSprite.anchor.setTo(0.5, 0.5);
        this.answerSprite.scale.set(2, 2);
    },

    transition: function() {
        console.log("transition");
    },

}
