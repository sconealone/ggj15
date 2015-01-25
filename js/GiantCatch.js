/**
 * Created by Ro on 24/01/2015.
 */
GiantCatch = function(game, data) {
    this.game = game;
    this.data = data;

    this.playerRun = null;

    this.blueberryRun = null;
    this.appleRun = null;
    this.pearRun = null;
    this.bananaRun = null;

    this.floor = null;

    this.startX = 0.7 * WIDTH
    this.groundY = 0.6 * HEIGHT;

    this.gravity = -981;

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

        this.game.load.image('ground', 'assets/ground.png');
        this.load.audio('blueberryPanic', ['assets/sounds/blueBerryPanic.wav']);
        this.load.audio('applePanic', ['assets/sounds/applePanic.wav']);
        this.load.audio('pearPanic', ['assets/sounds/pearPanic.wav']);
        this.load.audio('bananaPanic', ['assets/sounds/bananaPanic.wav']);
        this.load.audio('footstep', ['assets/sounds/footstep.wav']);

    },

    create: function(){

        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.floor = this.game.add.sprite(0, 0.72 * HEIGHT, 'ground');
        //this.floor.enableBody = true;
        //this.floor.body.immovable = true;

        this.playerRun = this.game.add.group();
        //this.game.physics.arcade.enable(this.playerRun);
        //this.playerRun.body.bounce.y = 0.2;

        this.blueberryRun = this.playerRun.create(this.startX, this.groundY, 'blueberry', 3);
        this.appleRun = this.playerRun.create(this.startX, this.groundY, 'apple', 3);
        this.pearRun = this.playerRun.create(this.startX, this.groundY, 'pear', 3);
        this.bananaRun = this.playerRun.create(this.startX, this.groundY, 'banana', 3);

        this.blueberryRun.animations.add('left', [0, 1, 2], 30, true);
        this.blueberryRun.animations.add('right', [4, 5, 6], 30, true);

        this.appleRun.animations.add('left', [0, 1, 2], 30, true);
        this.appleRun.animations.add('right', [4, 5, 6], 30, true);

        this.pearRun.animations.add('left', [0, 1, 2], 30, true);
        this.pearRun.animations.add('right', [4, 5, 6], 30, true);

        this.bananaRun.animations.add('left', [0, 1, 2], 30, true);
        this.bananaRun.animations.add('right', [4, 5, 6], 30, true);

        this.hud.create();
        this.timer.create();

        this.blueberryPanting = this.game.add.audio('blueberryPanic');
        this.bananaPanting = this.game.add.audio('bananaPanic');
        this.applePanting = this.game.add.audio('applePanic');
        this.pearPanting = this.game.add.audio('pearPanic');
        this.footstep = this.game.add.audio('footstep');

    },

    update: function(){
        var gm = GetGameManager(self.game);
        var sprites = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];
        for (var player=0; player < 4; ++player) {

            // left
            if (gm.getPlayerRespondKey(player, 0).isDown) { // will it crash!?!?!?!


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
            else if (gm.getPlayerRespondKey(player, 2).isDown) { // will it crash!?!?!?!
                sprites[player].x = Math.min(WIDTH, sprites[player].x + 5);
                sprites[player].animations.play('right');
            }

            // jump?

            // stahp
            else {
                sprites[player].animations.stop();
                sprites[player].frame = 3;
            }

        }
        this.hud.update();
        this.timer.update();

    },
 
    shutdown: function() {
        this.timer.stop()
    },


    checkResponse: function(){

    },
}
