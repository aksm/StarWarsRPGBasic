// Declare object
var game = {

	// Characters
	players: {
		leia: {name: "Princess Leia", hp: 100, ap: 6, cap: 3, pic: "assets/images/leia.png"},
		//vader: {name: "Darth Vader", hp: 180, ap: 8, cap: 6, pic: "assets/images/vader.jpg"},
		padme: {name: "Padme Amidala", hp: 100, ap: 6, cap: 3, pic: "assets/images/padme.jpg"},
		aurra: {name: "Aurra Sing", hp: 120, ap: 6, cap: 4, pic: "assets/images/aurra.png"},
		zam: {name: "Zam Wesell", hp: 110, ap: 5, cap: 3, pic: "assets/images/zam.jpg"}
	},

	// Gameplay variables
	player: "",
	playerhp: 0,
	playerap: 0,
	opponent: "",
	opponenthp: 0,
	characters: [],
	opponentsLeft: true,
	// jQuery html elements
	playerElement: $('#player'),
	opponentsElement: $('#opponents'),
	defenderElement: $('#defender'),

	// functions
	choosePlayer: function(e) {
		e.empty();
		$.each(this.characters, function(k, v) {
				e.append("<button class = 'character-button character-button-color' data-name ="+v+">" + game.players[v].name + "<img src='"+game.players[v].pic+"' class='character' >"+game.players[v].hp+"</button>");
		});
	},
	picked: function(e, p) {
		e.html("<div class = 'character-container' data-name ="+p+">" + game.players[p].name + "<img src='"+game.players[p].pic+"' class='character'><p>"+game.players[p].hp+"</p></div>");
	},
	updatePlayers: function(c) {
		if(this.player == "") {
	 		this.player = c;
	 		this.playerhp = this.players[this.player].hp;
	 		this.playerap = this.players[this.player].ap;
	 		this.picked(this.playerElement, this.player);
	 		this.characters.splice(this.characters.indexOf(this.player),1);
	 		this.choosePlayer(this.opponentsElement);
	 	} else if (this.opponent == "" && this.player != "") {
	 		this.opponent = c;
	 		this.opponenthp = this.players[this.opponent].hp;
	 		this.picked(this.defenderElement, this.opponent);
	 		this.characters.splice(this.characters.indexOf(this.opponent),1);
	 		this.choosePlayer(this.opponentsElement);
	 	}

	},
	fight: function() {
		if(this.player != "" && this.opponent != "" && this.opponenthp > 0 && this.playerhp > 0) {
			this.opponenthp = Math.max(0, this.opponenthp - this.playerap);
			$("[data-name='"+this.opponent+"']").children("p").html(this.opponenthp);
			this.playerhp = Math.max(0, this.playerhp - game.players[this.opponent].cap);
			$("[data-name='"+this.player+"']").children("p").html(this.playerhp);
			this.playerap = this.playerap + game.players[this.player].ap;
		} //else if ()
	}
}

// Game function calls
$(document).ready(function(){
	// Initialize character array
	$.each(game.players, function(k, v) {
		game.characters.push(k);
	});
	game.choosePlayer(game.playerElement);
	$('body').on("click", ".character-button",function() {
		var c = $(this).data("name");
		game.updatePlayers(c);
		console.log("Player HP: "+game.playerhp);
		console.log("Player AP: "+game.playerap);
		console.log("Player CAP: "+game.players[game.player].cap);
		console.log("Opponent HP: "+game.opponenthp);
		console.log("Opponent AP: "+game.players[game.opponent].ap);
		console.log("Opponent CAP: "+game.players[game.opponent].cap);
	});
});