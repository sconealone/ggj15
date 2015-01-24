Game = function(game) {
	this.game = game;
	miniGame = null;
}

Game.prototype = {

	preload: function() {
		_this = this;
		miniGame = new ShapeMatching(_this);

		miniGame.preload();
	},

	create: function() {
		miniGame.create();
	},

	update: function() {
		miniGame.update();
	}
}