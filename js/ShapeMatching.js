Game = function(game) {
	this.game = game;
}

Game.prototype = {

	preload: function() {

	},

	create: function() {
		// choose correct answer

		// choose order of shapes

		// draw the shapes each type of shape matching mini game needs to know its own layout
	},

	update: function() {
		checkResponse();
	},

	checkResponse: function() {
		if (!timeout) {
			//check if any of the response keys are pressed
			if (answer == all of the response keys) {
				//set those players to pass
			} else {
				//set the players with wrong responses to fail
				//fail this round
				//reduce collective lives
			}
		}
	}

	simpleKeyMatching: function() {
		//present instructions - match the keys

		//initiate correct response, statuses of each player

		//present the keys

		//start the timer

		//


	},

	// Shapes that the players must choose
	shape1 : -1,
	shape2 : -1,
	shape3 : -1,

	// Shape that we want them to match
	answer : -1,


}