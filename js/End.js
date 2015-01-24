End = function(game) {
    this.game = game;
}


//preload resources in this file
End.prototype = {
	preload: function() {
	},
    create: function () {
    	this.splash_screen = this.game.add.sprite(0, 0, 'endGame');
    	this.splash_screen.scale.setTo(0.72, 0.75);

        // l1 = this.game.add.button(300, 400, 'level1', this.startL1, this, 2, 1, 0);
        // l1.scale.setTo(0.2, 0.3);
        // l1.anchor.setTo(0.5, 0.5);

        // l2 = this.game.add.button(600, 400, 'level2', this.startL2, this, 2, 1, 0);
        // l2.scale.setTo(0.2, 0.3);
        // l2.anchor.setTo(0.5, 0.5);    

        // l3 = this.game.add.button(900, 400, 'level3', this.startL3, this, 2, 1, 0);
        // l3.scale.setTo(0.2, 0.3);
        // l3.anchor.setTo(0.5, 0.5);    
    },
};
