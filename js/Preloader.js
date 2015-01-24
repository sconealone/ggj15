Preloader = function(game) {
    this.game = game;
}


//preload resources in this file
Preloader.prototype = {
    preload: function () {
        this.game.load.image('endGame', 'assets/EndScreen.png');
    },

    create: function () {
        this.game.state.start("game");
	}
};
