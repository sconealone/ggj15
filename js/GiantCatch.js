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

}

GiantCatch.prototype = {
    preload: function(){
        this.game.load.spritesheet('blueberry', 'assets/blueberryrun.png', 89.71, 78);
        this.game.load.spritesheet('apple', 'assets/applerun.png', 72.86, 91);
        this.game.load.spritesheet('pear', 'assets/pearrun.png', 66.57, 91);
        this.game.load.spritesheet('banana', 'assets/bananarun.png', 68.43, 96);

        this.game.load.image('ground', 'assets/ground.png');
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

    },

    update: function(){
        var gm = GetGameManager(self.game);
        var sprites = [this.blueberryRun, this.appleRun, this.pearRun, this.bananaRun];
        for (var player=0; player < 4; ++player) {
            // left
            if (gm.getPlayerRespondKey(player, 0).isDown) { // will it crash!?!?!?!

                sprites[player].x = Math.max(0, sprites[player].x - 5);
                sprites[player].animations.play('left');
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

    },

    checkResponse: function(){

    },
}