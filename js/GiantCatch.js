/**
 * Created by Ro on 24/01/2015.
 */
GiantCatch = function(game, data) {
    this.game = game;
    this.data = data;

    this.playerRun = null;
    this.sprites = [];

    this.blueberryRun = null;
    this.appleRun = null;
    this.pearRun = null;
    this.bananaRun = null;

    this.floor = null;

    this.startX = 0.7 * WIDTH
    this.groundY = 0.7 * HEIGHT;

    this.handX = 0;
    this.handframe = 0;

    this.gravity = -981;

    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);


}

GiantCatch.prototype = {
    preload: function(){

        this.game.load.spritesheet('hand', 'assets/hand.png', 156, 606);

        this.game.load.image('ground', 'assets/ground.png');
    },

    create: function(){

        //this.floor = this.game.add.sprite(0, 0.72 * HEIGHT, 'ground');
        this.playerRun = this.game.add.group();

        this.blueberryRun = this.playerRun.create(this.startX, this.groundY, 'blueberry', 3);
        this.appleRun = this.playerRun.create(this.startX, this.groundY, 'apple', 3);
        this.pearRun = this.playerRun.create(this.startX, this.groundY, 'pear', 3);
        this.bananaRun = this.playerRun.create(this.startX, this.groundY, 'banana', 3);

        this.sprites = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];

        for (var player=0; player < 4; ++player) {
            this.sprites[player].animations.add('left', [0, 1, 2], 30, true);
            this.sprites[player].animations.add('right', [4, 5, 6], 30, true);
            this.sprites[player].anchor.setTo(0.5, 0.5);
        }

        this.handX = getRandomInt(0, WIDTH);
        this.handdown = this.game.add.sprite(this.handX, 0, 'hand', 0);
        this.handdown.anchor.setTo(0.5, 1);
        this.handdown.animations.add('move', [0, 1], 0.9, true);
        this.handdown.loopCount = 5;

        //this.handup = this.game.add.sprite(0, 0,'hand', 1);

        var tweenY = this.game.add.tween(this.handdown);
        var timeout = 1000;
        tweenY.to({y: this.groundY}, timeout);
        tweenY.repeat(-1);
        tweenY.yoyo(true);
        tweenY.start();

/*        var tweenX = this.game.add.tween(this.handdown);
        var timeoutX = 2000;
        tweenX.to({x: 0}, timeoutX);
        tweenX.repeat(5);
        tweenX.yoyo(true);
        tweenX.start();*/
    },

    update: function(){
        //this.checkHit();
        this.handdown.animations.play('move');
        this.checkResponse();
        this.checkCollisions();

        this.hud.create();
        this.timer.create();

    },

    checkHit: function(){
  /*      //var gm = GetGameManager(self.game);
        var handRect = new Phaser.Rectangle(this.handdown.x, this.handdown.y, this.handdown.width, this.handdown.height);
        var groundRect = new Phaser.Rectangle(this.floor.x, this.floor.y, this.floor.width, this.floor.height);
        if (handRect.intersects(groundRect)){
            this.handframe = 1;
        }else {
            this.handframe = 0;
        }*/


    },

    checkResponse: function(){
        var gm = GetGameManager(self.game);
        var sprites = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];
        for (var player=0; player < 4; ++player) {
            // left
            if (gm.getPlayerRespondKey(player, 0).isDown) {

                this.sprites[player].x = Math.max(0, sprites[player].x - 5);
                this.sprites[player].animations.play('left');
            }
            // right
            else if (gm.getPlayerRespondKey(player, 2).isDown) {
                this.sprites[player].x = Math.min(WIDTH, sprites[player].x + 5);
                this.sprites[player].animations.play('right');
            }
            // jump?

            // stahp
            else {
                this.sprites[player].animations.stop();
                this.sprites[player].frame = 3;
            }
        }
        this.hud.update();
        this.timer.update();

    },

    checkCollisions: function(){
        var gm = GetGameManager(this.game);
        var players = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];

        for (var i = 0; i < players.length; ++i){;
            if (players[i].overlap(this.handdown)){
                console.log("overlaps!" + i);
                gm.hud.setWrong(i);
            }
        }
    },

}

