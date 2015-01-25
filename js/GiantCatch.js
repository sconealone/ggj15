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

    this.startX = 0.7 * WIDTH;
    this.startY = 0;
    this.groundY = 0.7 * HEIGHT;

    this.handframe = 0;
    this.count = 0;

    this.timeout = 10;

    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);

    this.BLUEBERRY = 0;
    this.APPLE = 1;
    this.PEAR = 2;
    this.BANANA = 3;
    this.characters  = ["blueberry", "apple", "pear", "banana"];


}

GiantCatch.prototype = {
    preload: function(){

        this.game.load.spritesheet('hand', 'assets/hand.png', 156, 606);
        //this.game.load.image('ground', 'assets/ground.png');
        this.game.load.image('bk', 'assets/handbk.png');
        this.game.load.image('ground', 'assets/ground.png');
        this.load.audio('blueberryPanic', ['assets/sounds/blueBerryPanic.wav']);
        this.load.audio('applePanic', ['assets/sounds/applePanic.wav']);
        this.load.audio('pearPanic', ['assets/sounds/pearPanic.wav']);
        this.load.audio('bananaPanic', ['assets/sounds/bananaPanic.wav']);
        this.load.audio('footstep', ['assets/sounds/footstep.wav']);

    },

    reset : function () {

    this.playerRun = null;
    this.sprites = [];

    this.blueberryRun = null;
    this.appleRun = null;
    this.pearRun = null;
    this.bananaRun = null;

    this.floor = null;

    this.startX = 0.7 * WIDTH;
    this.startY = 0;
    this.groundY = 0.7 * HEIGHT;

    this.handframe = 0;
    this.count = 0;

    this.timeout = 10;

    this.hud = new Hud(this.game);
    this.timer = new Timer(this.game, this.hud);

    this.BLUEBERRY = 0;
    this.APPLE = 1;
    this.PEAR = 2;
    this.BANANA = 3;
    this.characters  = ["blueberry", "apple", "pear", "banana"];
    },
    create: function(){

        this.reset();
        this.game.add.sprite(0, 0, 'bk');
        //this.floor = this.game.add.sprite(0, 0.72 * HEIGHT, 'ground');
        this.playerRun = this.game.add.group();

        this.blueberryRun = this.playerRun.create(getRandomInt(0, WIDTH), this.groundY, 'blueberry', 3);
        this.appleRun = this.playerRun.create(getRandomInt(0, WIDTH), this.groundY, 'apple', 3);
        this.pearRun = this.playerRun.create(getRandomInt(0, WIDTH), this.groundY, 'pear', 3);
        this.bananaRun = this.playerRun.create(getRandomInt(0, WIDTH), this.groundY, 'banana', 3);

/*        this.blueberryRun = this.playerRun.create(this.startX, this.groundY, 'blueberry', 3);
        this.appleRun = this.playerRun.create(this.startX, this.groundY, 'apple', 3);
        this.pearRun = this.playerRun.create(this.startX, this.groundY, 'pear', 3);
        this.bananaRun = this.playerRun.create(this.startX, this.groundY, 'banana', 3);*/

        this.sprites = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];

        for (var player=0; player < 4; ++player) {
            this.sprites[player].animations.add('left', [0, 1, 2], 30, true);
            this.sprites[player].animations.add('right', [4, 5, 6], 30, true);
            this.sprites[player].anchor.setTo(0.5, 0.5);
        }

        //var x = getRandomInt(0, WIDTH);
        this.hand = this.game.add.sprite(this.startX, this.startY, 'hand', this.handframe);
        this.hand.animations.add('move', [0,1], 1, true);
        this.hand.anchor.setTo(0.5, 1);

        var tweenY = this.game.add.tween(this.hand);
        var time = 1000;
        tweenY.to({y: this.groundY}, time);
        tweenY.repeat(4);
        tweenY.yoyo(true);
        tweenY.start();
        tweenY.killOnComplete;

        var _this = this;
        this.timer.setTimeout(10, this.transition, _this);

        this.hud.create();
        this.timer.create();


        this.blueberryPanting = this.game.add.audio('blueberryPanic');
        this.bananaPanting = this.game.add.audio('bananaPanic');
        this.applePanting = this.game.add.audio('applePanic');
        this.pearPanting = this.game.add.audio('pearPanic');
        this.footstep = this.game.add.audio('footstep');

    },

    update: function(){
        this.hand.animations.play('move');
        for (var i = 0; i < 5; i++){

            if (this.hand.position.y == 0){
                this.handframe = 0;
                this.hand.position.x = getRandomInt(0, WIDTH);
           }
        }
        if (this.hand.position.y == this.groundY){
            this.handframe = 1;
        }
        this.checkResponse();
        this.checkCollisions();
        this.timer.update();
        this.hud.update();
    },

    checkResponse: function(){
        var gm = GetGameManager(self.game);
        var sprites = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];
        for (var player=0; player < 4; ++player) {

            // left
            if (gm.getPlayerRespondKey(player, 0).isDown) {

                this.sprites[player].x = Math.max(0, sprites[player].x - 5);
                this.sprites[player].animations.play('left');

                sprites[player].x = Math.max(0, sprites[player].x - 5);
                sprites[player].animations.play('left');

                if (player == this.BLUEBERRY && !this.blueberryPanting.isPlaying) {
                    this.blueberryPanting.play();
                }
                else if (player == this.PEAR && !this.pearPanting.isPlaying) {
                    this.pearPanting.play();
                }
                else if (player == this.APPLE && !this.applePanting.isPlaying) {
                    this.applePanting.play();
                }
                else if (player == this.BANANA && !this.bananaPanting.isPlaying) {
                    this.bananaPanting.play();
                }             
                   
                if (!this.footstep.playing) {
                    this.footstep.play();
                }

            }
            // right
            else if (gm.getPlayerRespondKey(player, 2).isDown) {
                this.sprites[player].x = Math.min(WIDTH, sprites[player].x + 5);
                this.sprites[player].animations.play('right');
            }
            // jump?
            // stand still
            else {
                this.sprites[player].animations.stop();
                this.sprites[player].frame = 3;
            }

        }
    },
 
    shutdown: function() {
        this.timer.stop()
    },


    checkCollisions: function(){
        var gm = GetGameManager(this.game);
        var players = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];
        var handRect = new Phaser.Rectangle(this.hand.x, this.hand.y, this.hand.width, this.hand.height);
        for (var i = 0; i < players.length; ++i){

            if (players[i].overlap(this.hand)){
                console.log("overlaps!" + i);
                this.hud.setWrong(i);
                gm.levelMaster.decreaseLife();
            }
        }
/*        if (this.count == 4){
            gm.levelMaster.decreaseLife();
        }*/
    },

}

