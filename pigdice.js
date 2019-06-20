let game;
let playerOne;
let playerTwo;

const p1ScoreDisplay = document.getElementById('p1-score');
const p2ScoreDisplay = document.getElementById('p2-score');
const winRequirement = document.getElementById('win-condition');
const pointsToWinDisplay = document.getElementById('points-to-win');
const playerTurnDisplay = document.getElementById('player-turn');
const diceValueDisplay = document.getElementById('dice-value');
const turnScoreDisplay = document.getElementById('turn-score');
const diceRollButton = document.getElementById('dice-roll-button');
const holdButton = document.getElementById('hold-button');
const playAIButton = document.getElementById('play-ai');
const firstPlayerDisplay = document.getElementById('p1-score-label');
const opponentNameDisplay = document.getElementById('p2-score-label');
const setupDisplay = document.getElementById('setup');
const gameDisplay = document.getElementById('game-board');
const resetGameButton = document.getElementById('reset-game');
const p1NameDisplay = document.getElementById('p1-name');
const p2NameDisplay = document.getElementById('p2-name');
const winnerDisplay = document.getElementById('winner');

class Game {
	constructor(playerOne, playerTwo, winCondition) {
		this.playerOne = playerOne;
		this.playerTwo = playerTwo;
		this.activePlayer = playerOne;
		this.winCondition = winCondition || 30;
	}
	toggleActivePlayer() {
		console.log(`switching from ${this.activePlayer.name}`);
		this.activePlayer == this.playerOne
			? (this.activePlayer = this.playerTwo)
			: (this.activePlayer = this.playerOne);
		console.log(`to ${this.activePlayer.name}`);
		console.log(
			`CURRENT SCORE: p1: ${this.playerOne.score}, p2: ${this.playerTwo.score}`
		);
		this.updatePlayerTurnDisplay();
	}
	gameOver(player) {
		winnerDisplay.innerHTML = `${player.name} wins!!`;
		this.hideGameButtons();
	}
	updateScoreBoard() {
		playerTurnDisplay.innerHTML = this.playerOne.name || 'Player One';
		p1NameDisplay.innerHTML = this.playerOne.name || 'Player One';
		p2NameDisplay.innerHTML = this.playerTwo.name || 'Player Two';
		firstPlayerDisplay.innerHTML = this.playerOne.name || 'Player One';
		opponentNameDisplay.innerHTML = this.playerTwo.name || 'Player Two';
		pointsToWinDisplay.innerHTML = this.winCondition;
	}
	updateScoreDisplay() {
		if (this.activePlayer.player === 'one') {
			p1ScoreDisplay.innerHTML = this.activePlayer.score;
		} else {
			p2ScoreDisplay.innerHTML = this.activePlayer.score;
		}
	}
	updatePlayerTurnDisplay() {
		playerTurnDisplay.innerHTML = this.activePlayer.name;
	}
	updateDiceRollDisplay() {
		diceValueDisplay.innerHTML = this.activePlayer.roll;
	}
	updateTurnScoreDisplay() {
		turnScoreDisplay.innerHTML = this.activePlayer.turnScore;
	}
	resetDiceAndTurnScore() {
		diceValueDisplay.innerHTML = null;
		turnScoreDisplay.innerHTML = 0;
	}
	showHoldButton() {
		holdButton.style = 'display: inline-block';
	}
	hideHoldButton() {
		holdButton.style = 'display: none';
	}
	hideGameButtons() {
		diceRollButton.style = 'display: none';
		this.hideHoldButton();
	}
}

class Player {
	constructor(isHuman, name) {
		this.isHuman = isHuman;
		this.name = name;
		this.turnScore = 0;
		this.score = 0;
		this.roll = null;
	}
	getDiceRoll() {
		this.roll = Math.floor(Math.random() * 6) + 1;
		game.updateDiceRollDisplay();
		console.log('ROLLING! ' + this.roll);
	}
	increaseTurnScore() {
		this.turnScore += this.roll;
	}
	evaluateDice() {
		if (this.roll === 1) {
			this.wipe();
		} else {
			this.increaseTurnScore();
			game.showHoldButton();
			game.updateTurnScoreDisplay();
			console.log(`Current Turn Score: ${this.turnScore}`);
		}
	}
	rollDice() {
		this.getDiceRoll();
		diceValueDisplay.innerHTML = this.roll;
		this.evaluateDice();
	}
	wipe() {
		console.log('WIPED');
		this.turnScore = 0;
		game.justWiped = true;
		game.hideHoldButton();
		game.toggleActivePlayer();
	}
	hold() {
		console.log('HOLDING');
		this.score += this.turnScore;
		this.turnScore = 0;
		game.updateScoreDisplay();
		game.resetDiceAndTurnScore();
		this.checkWonGame();
		game.toggleActivePlayer();
	}
	checkWonGame() {
		if (this.score >= game.winCondition) {
			game.gameOver(this);
		}
	}
}

class ComputerPlayer extends Player {
	// Difficulty 1 - 5 // Risk Appetite 1 - 5
	constructor(name, difficulty = 1, riskAppetite = 1) {
		super(false);
		this.name = name;
		this.difficulty = difficulty;
		this.riskAppetite = riskAppetite;
	}
	takeTurn() {
		let wiped;
		while (this.turnScore < 15) {
			this.getDiceRoll();
			if (this.roll === 1) {
				wiped = true;
				break;
			} else {
				this.turnScore += this.roll;
			}
		}
		if (wiped) {
			this.wipe();
		} else {
			this.hold();
		}
	}
}

function init(e) {
	let isPvP = e.target.value === 'human' ? true : false;
	gameDisplay.style = 'display: block';
	setupDisplay.style = 'display: none';
	playerOne = new Player(true, p1NameDisplay.value || 'Player One');
	if (isPvP) {
		playerTwo = new Player(true, p2NameDisplay.value);
	} else {
		playerTwo = new ComputerPlayer(p2NameDisplay.value, 1, 1);
	}
	let pointsToWin = typeof (winRequirement.value == 'number')
		? winRequirement.value
		: 30;
	playerOne.player = 'one';
	playerTwo.player = 'two';
	game = new Game(playerOne, playerTwo, pointsToWin);
	game.updateScoreBoard();
	console.log(game);
}

function handleDiceRoll() {
	game.activePlayer.rollDice();
}

function handleHold() {
	game.activePlayer.hold();
}

function handleResetGame() {
	gameDisplay.style = 'display: none';
	setupDisplay.style = 'display: block';
	p1NameDisplay.value = '';
	p2NameDisplay.value = '';
	winRequirement.value = '';
}
