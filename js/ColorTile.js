/**
 * Created by Ro on 24/01/2015.
 */
ColorTile = function(game) {
    this.game = game;

    this.word1 = -1;
    this.word2 = -1;
    this.answer = -1;
    this.apos = -1;

    this.wordSprite1 = null;
    this.wordSprite2 = null;
    this.wordSprite3 = null;

    this.question = '';
    this.order = [];
    this.qColor = '';

    this.spritesheet = 'words';
    this.spritesheetPath = 'assets/colorWords.png';
    this.frameWidth = 128;
    this.frameHeight = 64;

    this.wordSprite1X = 0.33 * game.world.width;
    this.wordSprite2X = 0.5 * game.world.width;
    this.wordSprite3X = 0.67 * game.world.width;
    this.wordSpriteY = 0.4 * game.world.height;

    // constants
    this.MAX_FRAME = 5;
    this.MIN_FRAME = 0;

    this.timeout = 2;
}

ColorTile.prototype = {

    checkResponse: function() {
        for (var i=0; i < 3 ; i++) {
            if (!this.game.p1Resp.responded && this.game.p1Resp[i].isDown) {
                this.game.p1Resp.responded = true;

                if (i == this.apos) {
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

                if (i == this.apos) {
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

                if (i == this.apos) {
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

                if (i == this.apos) {
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

    preload: function(){
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight);
    },

    create: function(){
        console.log("create answer and orders");

        // generate answer between 0 and 5
        this.answer = getRandomInt(this.MIN_FRAME, this.MAX_FRAME);

        var a;
        var b;
        for (var i = this.answer - 1; i <= this.answer + 1; i++){
            a = ((this.answer - 1) < this.MIN_FRAME ? this.MAX_FRAME : this.answer - 1);
            b = ((this.answer + 1) > this.MAX_FRAME ? this.MIN_FRAME : this.answer + 1);
        }

        // get the order of the words
        var c = [a, this.answer, b];
        this.order = generateOrder(c);
        this.word1 = this.order[0];
        this.word2 = this.order[1];
        this.word3 = this.order[2];

        // generate the answer's position
        this.apos = this.order.indexOf(this.answer);

        // generate question's color
        var col = ['BLUE', 'RED', 'ORIANGE', 'GREEN', 'PURPLE', 'YELLOW'];
        this.qColor = col[this.answer];

        // draw the layout
        this.drawLayout();

        // start timer
        var _this = this;
        this.game.timer.setTimeout(this.timeout, this.transition, _this);

    },

    update: function(){
        this.checkResponse();

    },

    drawLayout: function(){
        // create question: Which button is <color>?
        var x = this.game.world.width * 0.5;
        var y = this.wordSpriteY - 80;
        this.question = this.game.add.text(x, y, 'Pick the '+ this.qColor + ' word. :)', { frontSize: '32px', fill: '#fff'});
        this.question.anchor.setTo(0.5, 0.5);

        this.wordSprite1 = this.game.add.sprite(this.wordSprite1X, this.wordSpriteY, this.spritesheet, this.word1);
        this.wordSprite2 = this.game.add.sprite(this.wordSprite2X, this.wordSpriteY, this.spritesheet, this.word2);
        this.wordSprite3 = this.game.add.sprite(this.wordSprite3X, this.wordSpriteY, this.spritesheet, this.word3);

        this.wordSprite1.anchor.setTo(0.5, 0.5);
        this.wordSprite2.anchor.setTo(0.5, 0.5);
        this.wordSprite3.anchor.setTo(0.5, 0.5);

    },

    transition: function(_this){
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
    }

}