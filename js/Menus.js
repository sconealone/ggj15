Menus = function() {

}

Menus.FailState = function(game, data) {
    this.game = game;
    this.data = data;
}


//preload resources in this file
Menus.FailState.prototype = {
	preload: function() {
        this.game.load.spritesheet('bg', 'assets/backgrounds.png', 1280, 720);
        this.game.load.spritesheet('failFruits', 'assets/failFruits.png', 425, 355);
	},
    create: function () {
        // Choose a random bg
        var bgFrame = getRandomInt(3, 8); // fail backgrounds
        this.game.add.sprite(0, 0, 'bg', bgFrame);
        
        // Choose a random failed fruit if there are many
        // TODO show multiple fruits?
        var gm = GetGameManager(this.game);
        console.log(gm.levelMaster.data);
        var index = getRandomInt(0, gm.levelMaster.failFruits.length-1);
        var failedFruitFrame = gm.levelMaster.failFruits[index];
        var fruit = this.game.add.sprite(WIDTH*0.5, HEIGHT*0.67, 'failFruits', failedFruitFrame);
        fruit.anchor.setTo(0.5, 0.5);

        setInterval(function() {
            gm.levelMaster.nextLevel()
        }, 3000);
    },
};

Menus.EndState = function(game, data) {
    this.game = game;
    this.data = data;
}
Menus.EndState.prototype = {
    preload: function() {
    },
    create: function() {
    },
    update: function() {
    },
};

Menus.NewGame = function(game) {
    this.game = game;
}
Menus.NewGame.prototype = {
    preload: function() {
    },
    create: function() {
    },
    update: function() {
    },
};
