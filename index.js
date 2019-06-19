const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');
const playerTurnDisplay = document.getElementById('player-turn');
const diceValueDisplay = document.getElementById('dice-value');
const turnScoreDisplay = document.getElementById('turn-score');
const holdButton = document.getElementById('hold-button');
const playAIButton = document.getElementById('play-ai');
const opponentName = document.getElementById('opponent-name');
const setup = document.getElementById('setup');
const gameVsHuman = document.getElementById('game-human');
const gameVsComputer = document.getElementById('game-computer');
const resetGame = document.getElementById('reset-game');
const p1Name = document.getElementById('p1-name');
const p2Name = document.getElementById('p2-name');

// TODO: Map system out in LucidChart
// TODO: Refactor game, player into class
// TODO: Add Computer Player

class Player {
	constructor(isHuman, name) {
		this.isHuman = isHuman;
		this.name = name;
		this.score = 0;
	}
	giveStatus() {
		return `Greetings! I'm the ${this.isHuman ? 'human' : 'computer'} player, ${
			this.name
		}, and I have ${this.score} points!`;
	}
}

class Game {
	constructor(playerOne, playerTwo) {
		this.playerOne = playerOne;
		this.playerTwo = playerTwo;
		this.playerOneTurn = true;
		this.turnScore = 0;
		this.roll = '';
	}
}

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

function handleDiceRoll() {
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

function handleHold() {
	game.holdPoints();
	game.endTurn();
	game.updateInterface();
}

function handleSelectHuman(e) {
	console.log(e.target.value);
	setup.style = 'display: none';
	gameVsHuman.style = 'display: block';
	init(true);
}
function handleSelectComputer(e) {
	setup.style = 'display: none';
	gameVsComputer.style = 'display: block';
	init(false);
}

function init(e) {
	let isPvP = e.target.value === 'human' ? true : false;
	isPvP
		? (gameVsHuman.style = 'display: block')
		: (gameVsComputer.style = 'display: block');
	setup.style = 'display: none';
	let playerOne = new Player(true, p1Name.value || 'Player One');
	let playerTwo = new Player(
		isPvP ? true : false,
		p2Name.value || 'Player Two'
	);
	let currentGame = new Game(playerOne, playerTwo);
}

function handleResetGame() {
	// revert to setup screen
	// clear filled values
	gameVsComputer.style = 'display: none';
	gameVsHuman.style = 'display: none';
	setup.style = 'display: block';
	p1Name.value = '';
	p2Name.value = '';
}
