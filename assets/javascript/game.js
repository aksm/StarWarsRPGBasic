// Declare object
var game = {

	// Characters
	players: {
		leia: {name: "Leia Organa", hp: 120, ap: 8, cap: 8, pic: "assets/images/leia.png"},
		//vader: {name: "Darth Vader", hp: 180, ap: 8, cap: 6, pic: "assets/images/vader.jpg"},
		rey: {name: "Rey", hp: 100, ap: 10, cap: 5, pic: "assets/images/rey.jpg"},
		//padme: {name: "Padmé Amidala", hp: 100, ap: 6, cap: 3, pic: "assets/images/padme.jpg"},
		aurra: {name: "Aurra Sing", hp: 180, ap: 2, cap: 25, pic: "assets/images/aurra.png"},
		zam: {name: "Zam Wesell", hp: 150, ap: 4, cap: 20, pic: "assets/images/zam.jpg"}
	
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
	fightStatus: $('#fight-status'),

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
	 		this.fightStatus.empty();
	 		this.opponent = c;
	 		this.opponenthp = this.players[this.opponent].hp;
	 		this.picked(this.defenderElement, this.opponent);
	 		this.characters.splice(this.characters.indexOf(this.opponent),1);
	 		this.choosePlayer(this.opponentsElement);
	 	}

	},
	fight: function() {
		if (this.player != "" && this.opponent != "" && this.opponenthp > 0 && this.playerhp > 0) {
			this.opponenthp = Math.max(0, this.opponenthp - this.playerap);
			$("[data-name='"+this.opponent+"']").children("p").html(this.opponenthp);
			if(!(this.opponenthp == 0)) {
				this.playerhp = Math.max(0, this.playerhp - game.players[this.opponent].cap);
			}
			$("[data-name='"+this.player+"']").children("p").html(this.playerhp);
			this.fightStatus.html("<p>You attacked "+this.players[this.opponent].name+" for "+this.playerap+" damage.</p><p>"+this.players[this.player].name+" attacked you back for "+game.players[this.opponent].cap+" damage.</p>");
			this.playerap = this.playerap + game.players[this.player].ap;
			if (this.playerhp == 0) {
				this.fightStatus.html("<p>You have been defeated. GAME OVER!!!</p><button id='restart' onclick='game.restart()'>RESTART</button>");
			} else if (this.characters.length > 0 && this.opponenthp == 0) {
				this.fightStatus.html("<p>You have defeated "+this.players[this.opponent].name+". Choose your next opponent.</p>");
				this.opponent = "";
				this.defenderElement.empty();
			} else if (this.characters.length < 1 && this.opponenthp == 0) {
				this.defenderElement.empty();
				this.fightStatus.html("<p>YOU WON!!! GAME OVER!!!</p><button id='restart' onclick='game.restart()'>RESTART</button>");				
			}
		} else if (this.player != "" && this.opponent == "") {
			this.fightStatus.html("<p>No enemy here.</p>");
		}
	},
	restart: function() {
		this.player = "";
		this.playerhp = 0;
		this.playerap = 0;
		this.opponent = "";
		this.opponenthp = 0;
		this.characters = [];
		this.playerElement.empty();
		this.defenderElement.empty();
		this.opponentsElement.empty();
		this.fightStatus.empty();
		this.init();
	},
	init: function() {
		$.each(this.players, function(k, v) {
			game.characters.push(k);
		});
		this.choosePlayer(this.playerElement);
	}
}

// Game function calls
$(document).ready(function(){
	$(".gameplay").hide();
	//$(".intro-container").css("background-image", "none");
	$(".intro-container").removeClass("game-container");
	// Intro end
	$("#intro").mouseup(function() {
		var audio = document.getElementById("introAudio");
		$(this).hide();
		audio.pause();
		$(".intro-container").addClass("game-container");
		$(".game-container").removeClass("intro-container");
		$(".gameplay").show();
	});

	// Initialize character array
	game.init();
	$('body').on("click", ".character-button",function() {
		var c = $(this).data("name");
		game.updatePlayers(c);
	});
});