ShapeMatching = function(game) {
	this.game = game;

	this.keyboard = this.game.input.keyboard;

    this.shape1 = -1;
    this.shape2 = -1;
    this.shape3 = -1;
    this.answer = -1;

    this.order = []

    this.shapeSprite1 = null;
    this.shapeSprite2 = null;
    this.shapeSprite3 = null;
    this.answerSprite = null;

    this.spritesheet = 'keys';
    this.spritesheetPath = 'assets/keys.png';
    this.frameWidth = 32;
    this.frameHeight = 32;

    // override these
    // Actually it would be better if we could pass in a struct for each type of mini game
    this.shapeSpriteX1 = 0.25*game.world.width;
    this.shapeSpriteY1 = 0.5*game.world.height;

    this.shapeSpriteX2 = 0.5*game.world.width;
    this.shapeSpriteY2 = 0.25*game.world.height;

    this.shapeSpriteX3 = 0.75*game.world.width;
    this.shapeSpriteY3 = 0.5*game.world.height;

    this.answerSpriteX = 0.5*game.world.width;
    this.answerSpriteY = 0.5*game.world.height;
}

// helpers and sh1t
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateOrder(o) {
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}


ShapeMatching.prototype = {

	initializeKeys: function() {
		this.p1Resp = {
			0: this.keyboard.addKey(Phaser.Keyboard.Q),  
			1: this.keyboard.addKey(Phaser.Keyboard.W), 
		    2: this.keyboard.addKey(Phaser.Keyboard.E),
		    responded: false
		};

		this.p2Resp = {
			0: this.keyboard.addKey(Phaser.Keyboard.A),
			1: this.keyboard.addKey(Phaser.Keyboard.S),
			2: this.keyboard.addKey(Phaser.Keyboard.D),
			responded: false
		};

		this.p3Resp = {
			0: this.keyboard.addKey(Phaser.Keyboard.I),  
			1: this.keyboard.addKey(Phaser.Keyboard.O), 
		 	2: this.keyboard.addKey(Phaser.Keyboard.P),
		 	responded: false
		 };

		this.p4Resp = {
			0: this.keyboard.addKey(Phaser.Keyboard.J),  
			1: this.keyboard.addKey(Phaser.Keyboard.K), 
			2: this.keyboard.addKey(Phaser.Keyboard.L),
			responded: false
		};

	},

	checkResponse: function() {
		for (var i=0; i < 3 ; i++) {
			if (!this.p1Resp.responded && this.p1Resp[i].isDown) {
				this.p1Resp.responded = true;

				i == this.answer ? console.log("p1 pass") : console.log("p1 fail");
			}

			if (!this.p2Resp.responded && this.p2Resp[i].isDown) {
				this.p2Resp.responded = true;

				i == this.answer ? console.log("p2 pass") : console.log("p2 fail");
			}

			if (!this.p3Resp.responded && this.p3Resp[i].isDown) {
				this.p3Resp.responded = true;

				i == this.answer ? console.log("p3 pass") : console.log("p3 fail");
			}

			if (!this.p4Resp.responded && this.p4Resp[i].isDown) {
				this.p4Resp.responded = true;

				i == this.answer ? console.log("p4 pass") : console.log("p4 fail");
			}									
		}



		// if (!timeout) {
		// 	//check if any of the response keys are pressed
		// 	if (answer == all of the response keys) {
		// 		//set those players to pass
		// 	} else {
		// 		//set the players with wrong responses to fail
		// 		//fail this round
		// 		//reduce collective lives
		// 	}
		// }
	},

	preload: function() {
        this.game.load.spritesheet(this.spritesheet, this.spritesheetPath, this.frameWidth, this.frameHeight)

	},

	create: function() {
		//initialize the keys for each player
		this.initializeKeys();

		console.log("creating matching");

		// choose correct answer
		this.answer = getRandomInt(0, 2);
		console.log(this.answer);

		// choose order of shapes
		var a = [0, 1, 2];
		this.order = generateOrder(a);
        this.shape1 = a[0];
        this.shape2 = a[1];
        this.shape3 = a[2];

		console.log(this.order);

		// draw the shapes each type of shape matching mini game needs to know its own layout
        this.drawLayout();
	},

	update: function() {
		this.checkResponse();
	},

	simpleKeyMatching: function() {
		//present instructions - match the keys

		//initiate correct response, statuses of each player

		//present the keys

		//start the timer

		//


	},

    drawLayout : function() {
        this.shapeSprite1 = this.game.add.sprite(this.shapeSpriteX1, this.shapeSpriteY1, this.spritesheet, this.shape1);
        this.shapeSprite2 = this.game.add.sprite(this.shapeSpriteX2, this.shapeSpriteY2, this.spritesheet, this.shape2);
        this.shapeSprite3 = this.game.add.sprite(this.shapeSpriteX3, this.shapeSpriteY3, this.spritesheet, this.shape3);
        this.answerSprite = this.game.add.sprite(this.answerSpriteX, this.answerSpriteY, this.spritesheet, this.answer);
    },

}
