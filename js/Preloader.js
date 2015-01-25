Preloader = function(game) {
    this.game = game;
}


//preload resources in this file
Preloader.prototype = {
    preload: function () {
        this.game.load.spritesheet('timers', 'assets/timer.png', 256, 32);
        this.game.load.spritesheet('avatars', 'assets/avatars.png', 32, 32);
        this.game.load.image('life', 'assets/life.png')
    },

    create: function () {
        this.game.state.start("levelMaster");
	}
};
