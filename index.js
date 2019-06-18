const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');
const playerTurnDisplay = document.getElementById('player-turn');
const diceValueDisplay = document.getElementById('dice-value');
const turnScoreDisplay = document.getElementById('turn-score');
const holdButton = document.getElementById('hold-button');
const playAIButton = document.getElementById('play-ai');
const opponentName = document.getElementById('opponent-name');

// TODO: Add Computer Player

const game = {
	versusAI: false,
	playerOne: {
		score: 0
	},
	playerTwo: {
		score: 0
	},
	playerOneTurn: true,
	turnScore: 0,
	lastRoll: '',
	rollDice() {
		this.lastRoll = Math.floor(Math.random() * 6) + 1;
	},
	holdPoints() {
		this.playerOneTurn
			? (this.playerOne.score += this.turnScore)
			: (this.playerTwo.score += this.turnScore);
	},
	increaseTurnScore(num) {
		this.turnScore += num;
	},
	endTurn() {
		this.turnScore = 0;
		this.togglePlayerTurn();
	},
	togglePlayerTurn() {
		this.playerOneTurn = !this.playerOneTurn;
	},
	toggleHoldButton() {
		this.lastRoll > 1
			? (holdButton.style = 'display: inline-block')
			: (holdButton.style = 'display: none');
	},
	updateInterface() {
		turnScoreDisplay.innerHTML =
			game.lastRoll === 1 ? 'WIPED!' : game.turnScore;
		p1Score.innerHTML = game.playerOne.score;
		p2Score.innerHTML = game.playerTwo.score;
		playerTurnDisplay.innerHTML = game.playerOneTurn ? 'One' : 'Two';
		diceValueDisplay.innerHTML = game.lastRoll;
	}
};

function onDiceRoll() {
	game.rollDice();
	if (game.lastRoll === 1) {
		game.endTurn();
		game.updateInterface();
	} else {
		game.increaseTurnScore(game.lastRoll);
		game.updateInterface();
	}
	game.toggleHoldButton();
}

function onHold() {
	game.holdPoints();
	game.endTurn();
	game.updateInterface();
}

function togglePlayAI() {
	game.versusAI = !game.versusAI;
	if (game.versusAI) {
		opponentName.innerHTML = 'Computer';
		playAIButton.innerText = 'Play vs Human';
	} else {
		opponentName.innerHTML = 'Player Two';
		playAIButton.innerText = 'Play vs Computer';
	}
}
