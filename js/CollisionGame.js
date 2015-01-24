CollisionGame = function(game) {
    this.game = game;
    var _this = this;
    this.p1 = new Player(game, _this, 0);
    this.p2 = new Player(game, _this, 1);
    this.p3 = new Player(game, _this, 2);
    this.p4 = new Player(game, _this, 3);
    this.gravity = -981;
}

CollisionGame.prototype = {
    preload : function() {
        this.p1.preload();
        this.p2.preload();
        this.p3.preload();
        this.p4.preload();
    },

    create : function() {
        this.p1.create();
        this.p2.create();
        this.p3.create();
        this.p4.create();
    },

    update : function() {
        this.checkResponse();
        this.p1.update();
        this.p2.update();
        this.p3.update();
        this.p4.update();
    },

    checkResponse: function() {
        for (var i=0; i < 3 ; i++) {
            if (!this.game.p1Resp.responded && this.game.p1Resp[i].isDown) {
                this.game.p1Resp.responded = true;
                this.p1.jump();
            }

            if (!this.game.p2Resp.responded && this.game.p2Resp[i].isDown) {
                this.game.p2Resp.responded = true;
                this.p2.jump();
            }

            if (!this.game.p3Resp.responded && this.game.p3Resp[i].isDown) {
                this.game.p3Resp.responded = true;
                this.p3.jump();
            }

            if (!this.game.p4Resp.responded && this.game.p4Resp[i].isDown) {
                this.game.p4Resp.responded = true;
                this.p4.jump();
            }                                    
        }
    },
}

Player = function(game, collisionGame, playerNumber) {
    this.game = game;
    this.collisionGame = collisionGame;
    this.playerNumber = playerNumber;
    this.v0 = 0;
    this.groundY = 0.6 * this.game.game.world.height;
    this.sprite = null;
    this.t0 = -1;
}

Player.prototype = {
    preload : function() {
    },

    create : function() {
        // This is bad, but I'm only doing it because I'm reusing the avatar
        // when i should be using the fruit sprites
        this.sprite = this.game.add.sprite(this.game.world.width * 0.333 - this.playerNumber * 24, this.groundY, 'avatars', this.game.hud.frameForSprite(this.playerNumber));
        this.sprite.anchor.setTo(0, 1);
    },

    update : function() {
        var dt = this.game.time.totalElapsedSeconds() - this.t0;
        var d = -0.5*this.collisionGame.gravity*dt*dt - this.v0*dt + this.groundY;
        d = Math.min(this.groundY, d);
        this.sprite.position.y = d;
    },

    jump: function() {
        console.log("player " + (this.playerNumber + 1) + " jump");
        this.v0 = 500;
        this.t0 = this.game.time.totalElapsedSeconds();
    },
}
