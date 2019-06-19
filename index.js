const p1Score = document.getElementById('p1-score');
const p2Score = document.getElementById('p2-score');
const playerTurnDisplay = document.getElementById('player-turn');
const diceValueDisplay = document.getElementById('dice-value');
const turnScoreDisplay = document.getElementById('turn-score');
const holdButton = document.getElementById('hold-button');
const playAIButton = document.getElementById('play-ai');
const firstPlayer = document.getElementById('p1-score-label');
const opponentName = document.getElementById('p2-score-label');
const setup = document.getElementById('setup');
const gameDisplay = document.getElementById('game-board');
const resetGame = document.getElementById('reset-game');
const p1Name = document.getElementById('p1-name');
const p2Name = document.getElementById('p2-name');

// TODO: Move some Game methods to Player
// TODO: Create Computer class extended from Player

// Init game
let game;

class Player {
	constructor(isHuman, name) {
		this.isHuman = isHuman;
		this.name = name;
		this.score = 0;
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
	rollDice() {
		console.log(game);
		this.roll = Math.floor(Math.random() * 6) + 1;
	}
	holdPoints() {
		this.playerOneTurn
			? (this.playerOne.score += this.turnScore)
			: (this.playerTwo.score += this.turnScore);
	}
	increaseTurnScore(num) {
		this.turnScore += num;
	}
	endTurn() {
		this.turnScore = 0;
		this.togglePlayerTurn();
	}
	togglePlayerTurn() {
		this.playerOneTurn = !this.playerOneTurn;
	}
	toggleHoldButton() {
		this.roll > 1
			? (holdButton.style = 'display: inline-block')
			: (holdButton.style = 'display: none');
	}
	compRollDice() {}
	compHold() {}
	updateInterface() {
		turnScoreDisplay.innerHTML = game.roll === 1 ? 'WIPED!' : game.turnScore;
		p1Score.innerHTML = game.playerOne.score;
		p2Score.innerHTML = game.playerTwo.score;
		firstPlayer.innerHTML = game.playerOne.name;
		opponentName.innerHTML = game.playerTwo.name;
		playerTurnDisplay.innerHTML = game.playerOneTurn
			? game.playerOne.name
			: game.playerTwo.name;
		diceValueDisplay.innerHTML = game.roll;
	}
}

function handleDiceRoll() {
	game.rollDice();
	if (game.roll === 1) {
		game.endTurn();
		game.updateInterface();
	} else {
		game.increaseTurnScore(game.roll);
		game.updateInterface();
	}
	game.toggleHoldButton();
}

function handleHold() {
	game.holdPoints();
	game.endTurn();
	game.updateInterface();
}

function init(e) {
	let isPvP = e.target.value === 'human' ? true : false;
	gameDisplay.style = 'display: block';
	setup.style = 'display: none';
	let playerOne = new Player(true, p1Name.value || 'Player One');
	let playerTwo = new Player(
		isPvP ? true : false,
		p2Name.value || 'Player Two'
	);
	game = new Game(playerOne, playerTwo);
	game.updateInterface();
	console.log(game);
}

function handleResetGame() {
	// revert to setup screen
	// clear filled values
	gameVsComputer.style = 'display: none';
	gameDisplay.style = 'display: none';
	setup.style = 'display: block';
	p1Name.value = '';
	p2Name.value = '';
}
