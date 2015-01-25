Menus = function() {

}

Menus.FailState = function(game) {
    this.game = game;
}


//preload resources in this file
Menus.FailState.prototype = {
	preload: function() {
        this.game.load.image('failed', 'assets/FailState.png');



	},
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'failed');
    	this.splash_screen.scale.setTo(0.3, 0.3);

        setInterval(function() {
            var gm = GetGameManager(this.game);
            gm.levelMaster.nextLevel();            
        }, 3000);

    },
};
