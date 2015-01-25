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
    },

    create: function () {
        this.game.state.start("levelMaster");
	}
};
