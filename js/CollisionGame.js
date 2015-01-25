CollisionGame = function(game, data) {
    this.game = game;
    this.data = data;
    var _this = this;
    order = generateOrder([0, 1, 2, 3]);
    //this.enemy = null;
     this.p1 = new CollisionGame.Player(game, _this, 0, order[0]);
    this.p2 = new CollisionGame.Player(game, _this, 1, order[1]);
    this.p3 = new CollisionGame.Player(game, _this, 2, order[2]);
    this.p4 = new CollisionGame.Player(game, _this, 3, order[3]);
    this.gravity = -981;
    this.groundY = 0.6 * HEIGHT;

    var collided = false;
    this.hud = new Hud(game);
    this.timer = new Timer(game, this.hud);
}

CollisionGame.prototype = {
    preload : function() {
        this.p1.preload();
        this.p2.preload();
        this.p3.preload();
        this.p4.preload();

        this.game.load.spritesheet('enemy', 'assets/ghost.png', 32, 48);

        this.load.audio('blueberryJump', ['assets/sounds/blueberryJump3.wav']);
        this.load.audio('appleJump', ['assets/sounds/appleJump1.wav']);
        this.load.audio('pearJump', ['assets/sounds/pearJump1.wav']);
        this.load.audio('bananaJump', ['assets/sounds/bananaJump2.wav']);

    },

    create : function() {
        this.p1.create();
        this.p2.create();
        this.p3.create();
        this.p4.create();

        this.hud.create();

        this.hud.timerFrame.visible = false;
        this.hud.timerBar.visible = false;

        this.enemy = this.game.add.sprite(this.game.width, this.groundY, 'enemy', 0);
        this.enemy.anchor.setTo(0, 1);
        this.enemy.scale.set(2, 2);

        var tween = this.game.add.tween(this.enemy);
        var timeout = 2000;
        tween.to({x:-64}, timeout);
        tween.start();

        var _this = this;
        this.timer.setTimeout(7, this.transition, _this);


        this.blueberryJump = this.game.add.audio('blueberryJump');
        this.bananaJump = this.game.add.audio('bananaJump');
        this.appleJump = this.game.add.audio('appleJump');
        this.pearJump = this.game.add.audio('pearJump');

    },

    update : function() {
        this.checkResponse();
        this.p1.update();
        this.p2.update();
        this.p3.update();
        this.p4.update();
        this.checkCollisions();
    },

    checkResponse: function() {
        var gm = GetGameManager(this.game);
        for (var i=0; i < 3 ; i++) {
            if (!gm.p1Resp.responded && gm.p1Resp[i].isDown) {
                gm.p1Resp.responded = true;
                this.p1.jump();
                if (!this.blueberryJump.isPlaying) {
                    this.blueberryJump.play();
                }
            }

            if (!gm.p2Resp.responded && gm.p2Resp[i].isDown) {
                gm.p2Resp.responded = true;
                this.p2.jump();
                if (!this.appleJump.isPlaying) {
                    this.appleJump.play();
                }                
            }

            if (!gm.p3Resp.responded && gm.p3Resp[i].isDown) {
                gm.p3Resp.responded = true;
                this.p3.jump();
                if (!this.pearJump.isPlaying) {
                    this.pearJump.play();
                }                
            }

            if (!gm.p4Resp.responded && gm.p4Resp[i].isDown) {
                gm.p4Resp.responded = true;
                this.p4.jump();
                if (!this.bananaJump.isPlaying) {
                    this.bananaJump.play();
                }
            }
        }
    },

    checkCollisions: function() {
        var gm = GetGameManager(this.game);
        var enemyRect = new Phaser.Rectangle(this.enemy.x, this.enemy.y, this.enemy.width, this.enemy.height);
        var players = [this.p1, this.p2, this.p3, this.p4];

        for (var i = 0; i < players.length; ++i) {
            var p = players[i];
            if (enemyRect.intersects(new Phaser.Rectangle(p.sprite.x, p.sprite.y, p.sprite.width, p.sprite.height))) {
                p.goFlying() 
                this.hud.setWrong(p.playerNumber);
                collided = true;
            }
            if (enemyRect.x + enemyRect.width < p.sprite.x && !p.flownAway) {
                this.hud.setRight(p.playerNumber);
            }
        }

    },

    transition: function(_this) {
        if (collided) {
            _this.game.levelMaster.decreaseLife();
        }
        this.hud.timerFrame.visible = true;
        this.hud.timerBar.visible = true;
    }
}

CollisionGame.Player = function(game, collisionGame, playerNumber, order) {
    this.game = game;
    this.collisionGame = collisionGame;
    this.playerNumber = playerNumber;
    this.vy0 = 0;
    this.vx0 = 0;
    this.sprite = null;
    this.t0 = -1;
    this.order = order
    this.flownAway = false;
    this.x0 = 0;
}

CollisionGame.Player.prototype = {
    preload : function() {
        this.game.load.spritesheet('collisionA', 'assets/collisionA.png', 73, 96);
    },

    create : function() {
        // This is bad, but I'm only doing it because I'm reusing the avatar
        // when i should be using the fruit sprites

        this.x0 = WIDTH * 0.333 - this.order * 48;
        this.sprite = this.game.add.sprite(this.x0, this.collisionGame.groundY, 'collisionA', this.playerNumber);

        this.sprite.anchor.setTo(0, 1);
    },

    update : function() {
        var dt = this.game.time.totalElapsedSeconds() - this.t0;
        var dy = -0.5*this.collisionGame.gravity*dt*dt - this.vy0*dt + this.collisionGame.groundY;
        dy = Math.min(this.collisionGame.groundY, dy);
        dx = this.vx0 * dt;
        this.sprite.position.y = dy;
        this.sprite.position.x = this.x0 - dx;

        if (this.flownAway) {
            this.sprite.angle -= 12;
        }
    },

    jump: function() {
        this.vy0 = 600;
        this.t0 = this.game.time.totalElapsedSeconds();
    },

    goFlying: function() {
        var gm = GetGameManager(this.game);
        if (!this.flownAway) {
            gm.setPlayerRespond(this.playerNumber);
            this.t0 = this.game.time.totalElapsedSeconds();
            this.vx0 = 200;
            this.vy0 = 700;
            this.flownAway = true;

            this.sprite.y -= this.sprite.height/2;
            this.sprite.x += this.sprite.width/2;
            this.sprite.anchor.setTo(0.5, 0.5);
        }
    },
}
