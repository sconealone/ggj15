/**
 * Created by Ro on 24/01/2015.
 */
ColorTile = function(game, data) {
	this.game = game;
    this.data = data;

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

    this.wordSprite1X = 0.33 * WIDTH
    this.wordSprite2X = 0.5 * WIDTH
    this.wordSprite3X = 0.67 * WIDTH
    this.wordSpriteY = 0.4 * HEIGHT

    // constants
    this.MAX_FRAME = 5;
    this.MIN_FRAME = 0;

    this.timeout = 5;
    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);
}

ColorTile.prototype = {

    checkResponse: function() {
        var gm = GetGameManager(this.game);
        for (var i=0; i < 3 ; i++) {
            if (!gm.p1Resp.responded && gm.p1Resp[i].isDown) {
                gm.p1Resp.responded = true;

                if (i == this.apos) {
                    console.log("p1 pass")
                    this.hud.setRight(0);
                } else {
                    console.log("p1 fail");
                    this.hud.setWrong(0);
                    gm.levelMaster.decreaseLife();
                }
            }

            if (!gm.p2Resp.responded && gm.p2Resp[i].isDown) {
                gm.p2Resp.responded = true;

                if (i == this.apos) {
                    console.log("p2 pass")
                    this.hud.setRight(1);
                } else {
                    console.log("p2 fail");
                    gm.levelMaster.decreaseLife();
                    this.hud.setWrong(1);
                }
            }

            if (!gm.p3Resp.responded && gm.p3Resp[i].isDown) {
                gm.p3Resp.responded = true;

                if (i == this.apos) {
                    console.log("p3 pass")
                    this.hud.setRight(2);
                } else {
                    console.log("p3 fail");
                    gm.levelMaster.decreaseLife();
                    this.hud.setWrong(2);
                }
            }

            if (!gm.p4Resp.responded && gm.p4Resp[i].isDown) {
                gm.p4Resp.responded = true;

                if (i == this.apos) {
                    console.log("p4 pass")
                    this.hud.setRight(3);
                } else {
                    console.log("p4 fail");
                    gm.levelMaster.decreaseLife();
                    this.hud.setWrong(3);
                }
            }
        }

    },

    preload: function(){
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight);
		this.game.load.image('unlocked', 'assets/buttonmashunlockedbg.png');
    },

    create: function(){
		
	
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
        var col = ['BLUE', 'RED', 'ORANGE', 'GREEN', 'PURPLE', 'YELLOW'];
        this.qColor = col[this.answer];

        // draw the layout
        this.drawLayout();

        // start timer
        var gm = GetGameManager(this.game);
        var _this = this;
        this.hud.create();
        this.timer.create();
        this.timer.setTimeout(this.timeout, this.transition, _this);

    },

    update: function(){
        this.checkResponse();
        this.hud.update();
        this.timer.update();

    },
    shutdown : function() {
        this.timer.stop();
    },

    drawLayout: function(){
        // create question: Which button is <color>?
		this.game.add.sprite(0,0,'unlocked');
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
        var gm = GetGameManager(_this.game)
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
        }
    }

}
