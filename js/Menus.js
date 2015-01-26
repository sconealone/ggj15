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

        this.load.audio('violin', ['assets/sounds/violin.wav']);
        this.load.audio('wahWah', ['assets/sounds/wahWah.wav']);
        this.load.audio('slowClap', ['assets/sounds/slowClap.wav']);

        this.load.audio('appleMad', ['assets/sounds/appleMad1.wav']);
        this.load.audio('pearMad', ['assets/sounds/pearMad01.wav']);
        this.load.audio('blueberryMad', ['assets/sounds/blueberryMad1.wav']);
        this.load.audio('bananaMad', ['assets/sounds/bananaMad1.wav']);

        this.load.audio('embApple', ['assets/sounds/embApple.wav']);
        this.load.audio('embPear', ['assets/sounds/embPear1.wav']);
        this.load.audio('embBlueberry', ['assets/sounds/blueberryMad2.wav']);
        this.load.audio('embBanana', ['assets/sounds/embBanana1.wav']);
    
	},
    create: function () {
        // Choose a random bg
        var bgFrame = getRandomInt(3, 8); // fail backgrounds
        this.game.add.sprite(0, 0, 'bg', bgFrame);
        
        var violin = this.game.add.audio('violin');
        var wahWah = this.game.add.audio('wahWah');
        var slowClap = this.game.add.audio('slowClap');

        var embApple = this.game.add.audio('embApple');
        var appleMad = this.game.add.audio('appleMad');
        var bananaMad = this.game.add.audio('bananaMad');
        var embBanana = this.game.add.audio('embBanana');
        var embPear = this.game.add.audio('embPear');
        var pearMad = this.game.add.audio('pearMad');
        var embBlueberry = this.game.add.audio('embBlueberry');
        var blueberryMad = this.game.add.audio('blueberryMad');


        var sfx = [violin, wahWah, slowClap];
        var crowdNoise = [appleMad, pearMad, bananaMad, blueberryMad, 
                            embApple, embBlueberry, embPear, embBanana];

        // Choose a random failed fruit if there are many
        // TODO show multiple fruits?
        var gm = GetGameManager(this.game);
        var index = getRandomInt(0, gm.levelMaster.failFruits.length-1);
        var failedFruitFrame = gm.levelMaster.failFruits[index];
        var fruit = this.game.add.sprite(WIDTH*0.5, HEIGHT*0.67, 'failFruits', failedFruitFrame);
        fruit.anchor.setTo(0.5, 0.5);


        //play random sound effect
        var i = getRandomInt(0, 2);
        var sound = sfx[i];
        sound.play();

        for (var k=0; k < 2; k++) {
            var j = getRandomInt(0,7);
            var noise = crowdNoise[j];
            noise.play();
        }


        setTimeout(function() {
            gm.levelMaster.nextLevel();
        }, 3000);
    },
};

Menus.EndState = function(game, data) {
    this.game = game;
    this.data = data;
}
Menus.EndState.prototype = {
    preload: function() {
        this.game.load.spritesheet('bg', 'assets/backgrounds.png', 1280, 720);
        this.game.load.spritesheet('failFruits', 'assets/failFruits.png', 425, 355);
    },
    create: function() {
        // Choose a random bg
        var bgFrame = 9;
        this.game.add.sprite(0, 0, 'bg', bgFrame);
        
        for (var i = 0; i < 4; ++i) {
            var fruit = this.game.add.sprite(WIDTH*0.2*(i+1), HEIGHT*0.85, 'failFruits', i);
            fruit.anchor.setTo(0.5, 1);
            fruit.scale.set(0.5, 0.5)
            if (i == 1 || i == 2)
                fruit.y += 60;
        }

    },
    update: function() {
    },
};

Menus.NewGame = function(game, data) {
    this.game = game;
    this.data = data;
}
Menus.NewGame.prototype = {
    preload: function() {
    },
    create: function() {
        var bgFrame = 11;
        var gm = GetGameManager(this.game);



        this.game.add.sprite(0, 0, 'bg', bgFrame);
        var _this = this;

        var question2 = this.game.add.text(WIDTH*.65, HEIGHT/2, 'Press space to continue', { frontSize: '42px', fill: '#ffffff'});
        question2.anchor.setTo(0.5, 0.5);
        this.key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);   
        this.f = function(e) {
            _this.game.state.start('instructions', true, false, _this.game, _this.data);
        }
        this.key.onDown.add(this.f)
    },
    shutdown: function() {
        this.key.onDown.remove(this.f)
    },
    update: function() {
    },
};

Menus.Instructions = function(game, data) {
    this.game = game;
    this.data = data;
}
Menus.Instructions.prototype = {
    preload: function() {
    },
    create: function() {
        var gm = GetGameManager(this.game);
        var bgFrame = 10;
        this.game.add.sprite(0, 0, 'bg', bgFrame);
        this.key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        var question2 = this.game.add.text(WIDTH*.5, HEIGHT*.55, 'Press space to continue', { frontSize: '42px', fill: '#ffffff'});
        question2.anchor.setTo(0.5, 0.5);
        this.f = function(e) {
            gm.levelMaster.nextLevel();
        }
        this.key.onDown.add(this.f)
    },
    shutdown: function() {
        this.key.onDown.remove(this.f)
    },
    update: function() {
    },
};
Menus.Success = function(game, data) {
    this.game = game;
    this.data = data;
}
Menus.Success.prototype = {
    preload: function() {
        this.game.load.image('win', 'assets/Succ.png');
    },
    create: function() {
        var gm = GetGameManager(this.game);
        
        this.game.add.sprite(0, 0, 'win');
        this.key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)

        this.f = function(e) {
            gm.levelMaster.newGameTransition();
        }
        this.key.onDown.add(this.f)
    },
    shutdown: function() {
        this.key.onDown.remove(this.f)
    },
    update: function() {
    },
};
