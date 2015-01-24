Preloader = function(game) {
    this.game = game;
}


//preload resources in this file
Preloader.prototype = {
    preload: function () {

    },

    create: function () {
        this.game.state.start("game");
	}
};
