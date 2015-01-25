Preloader = function(game) {
    this.game = game;
}


//preload resources in this file
Preloader.prototype = {
    preload: function () {
        this.game.load.spritesheet('timers', 'assets/timer.png', 438, 128);
        this.game.load.spritesheet('avatars', 'assets/avatars.png', 180, 200);
        this.game.load.image('life', 'assets/life.png')
        this.game.load.image('failed', 'assets/FailState.png');
        this.game.load.image('menu', 'assets/StartState.png');

        this.game.load.spritesheet('blueberry', 'assets/blueberryrun.png', 89.71, 78);
        this.game.load.spritesheet('apple', 'assets/applerun.png', 72.86, 91);
        this.game.load.spritesheet('pear', 'assets/pearrun.png', 66.57, 91);
        this.game.load.spritesheet('banana', 'assets/bananarun.png', 68.43, 96);
    },

    create: function () {
        this.game.state.start("levelMaster");
	}
};
