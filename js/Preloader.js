Preloader = function(game) {
    this.game = game;
}


//preload resources in this file
Preloader.prototype = {
    preload: function () {
        this.game.load.spritesheet('timers', 'assets/timer.png', 256, 32);
    },

    create: function () {
        this.game.state.start("levelMaster");
	}
};
