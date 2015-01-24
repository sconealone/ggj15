KeyMatching = function(game) {
    this.game = game;

    this.displayOrder = [];

    this.p1AvatarSprite = null;
    this.p2AvatarSprite = null;
    this.p3AvatarSprite = null;
    this.p4AvatarSprite = null;

    this.answer1Sprite = null;
    this.answer2Sprite = null;
    this.answer3Sprite = null;

    this.key1 = -1;
    this.key2 = -1;
    this.key3 = -1;
    this.key4 = -1;

    this.avatarSpritesheet = 'avatars'
    this.spritesheetPath = 'assets/avatars.png'
    this.frameWidth = 32;
    this.frameHeight = 32;

    this.FRAME_P1 = 0;
    this.FRAME_P2 = 1;
    this.FRAME_P3 = 6;
    this.FRAME_P4 = 7;

    this.avatarsY = 0.25*game.world.height;
    this.directionsY = 0.5*game.world.height;
    this.firstPlayerX = 0.20,
    this.secondPlayerX = 0.40,
    this.thirdPlayerX = 0.60,
    this.fourthPlayerX = 0.80;


    this.keySprite1 = null;
    this.keySprite2 = null;
    this.keySprite3 = null;
    this.keySprite4 = null;

    this.directionsSpriteSheet = 'directions';
    this.directionSpritesheetPath = 'assets/directions.png';
    this.frameWidth = 32;
    this.frameHeight = 32;

    // this.directionSprites = [game.world.width*this.fourthPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape4];


    // this.p1SpriteX = 
    // this.playerY = 0.25 * game.world.height;


    // override these
    // Actually it would be better if we could pass in a struct for each type of mini game
    // this.shapeSpriteX1 = 0.25*game.world.width;
    // this.shapeSpriteY1 = 0.5*game.world.height;

    // this.shapeSpriteX2 = 0.5*game.world.width;
    // this.shapeSpriteY2 = 0.25*game.world.height;

    // this.shapeSpriteX3 = 0.75*game.world.width;
    // this.shapeSpriteY3 = 0.5*game.world.height;

    // this.answerSpriteX = 0.5*game.world.width;
    // this.answerSpriteY = 0.5*game.world.height;
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


KeyMatching.prototype = {
    createAnswers: function() {
        this.p1Answer = getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL);
        this.p2Answer = getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL);
        this.p3Answer = getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL);
        this.p4Answer = getRandomInt(this.game.MIN_KEY_VAL, this.game.MAX_KEY_VAL);
    },

    checkResponse: function() {
        for (var i=0; i < 3 ; i++) {
            if (!this.game.p1Resp.responded && this.game.p1Resp[i].isDown) {
                this.game.p1Resp.responded = true;

                if (i == this.p1Answer) {
                    console.log("p1 pass") 
                    this.game.hud.setRight(0);
                } else {
                    console.log("p1 fail");
                    this.game.hud.setWrong(0);
                }
            }

            if (!this.game.p2Resp.responded && this.game.p2Resp[i].isDown) {
                this.game.p2Resp.responded = true;

                if (i == this.p2Answer) {
                    console.log("p2 pass") 
                    this.game.hud.setRight(1);
                } else {
                    console.log("p2 fail");
                    this.game.hud.setWrong(1);
                }
            }

            if (!this.game.p3Resp.responded && this.game.p3Resp[i].isDown) {
                this.game.p3Resp.responded = true;

                if (i == this.p3Answer) {
                    console.log("p3 pass") 
                    this.game.hud.setRight(2);
                } else {
                    console.log("p3 fail");
                    this.game.hud.setWrong(2);
                }
            }

            if (!this.game.p4Resp.responded && this.game.p4Resp[i].isDown) {
                this.game.p4Resp.responded = true;

                if (i == this.p4Answer) {
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
        console.log("creating multi player key matching");

        // choose correct answer
        this.createAnswers();
        console.log("p1: " + this.p1Answer);
        console.log("p2: " + this.p2Answer);
        console.log("p3: " + this.p3Answer);
        console.log("p4: " + this.p4Answer);

        // choose order of player iteration
        var p = [this.FRAME_P1, this.FRAME_P2, this.FRAME_P3, this.FRAME_P4];
        this.displayOrder = generateOrder(p);
        this.shape1 = this.displayOrder[0];
        this.shape2 = this.displayOrder[1];
        this.shape3 = this.displayOrder[2];
        this.shape4 = this.displayOrder[3];

        console.log(this.displayOrder);

        // draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();
    },

    update: function() {
        this.checkResponse();
    },

    drawLayout : function() {
        this.p1AvatarSprite = this.game.add.sprite(this.game.world.width*this.firstPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape1);
        this.p2AvatarSprite = this.game.add.sprite(this.game.world.width*this.secondPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape2);
        this.p3AvatarSprite = this.game.add.sprite(this.game.world.width*this.thirdPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape3);
        this.p4AvatarSprite = this.game.add.sprite(this.game.world.width*this.fourthPlayerX, this.avatarsY, this.avatarSpritesheet, this.shape4);

        this.p1AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p2AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p3AvatarSprite.anchor.setTo(0.5, 0.5);
        this.p4AvatarSprite.anchor.setTo(0.5, 0.5);
    },

}
