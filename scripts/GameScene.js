import Background from './Background.js';
import Timer from './Timer.js';
import Score from './Score.js';
import Characters from './Characters.js';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' });
	}

	preload() {
		this.load.image('bg', './images/bg.png');
		this.load.atlas('startButton', './images/startButton.png', './config/startButton.json');
		this.load.atlas('characters', './images/characters.png', './config/characters.json');
		this.load.atlas('characters-board', './images/characters-board.png', './config/characters-board.json');
		this.load.bitmapFont('mariofont', './fonts/mariofont.png', './fonts/mariofont.xml');
		this.load.animation('animations', './config/animations.json');
	}

	create() {
		this.gridConfig = {
			characterSize: 20,
			padding: 20,
			leftMargin: 5,
			rightMargin: 30,
			topMargin: 380,
			totalCharacters: 99
		};

		// Background
		this.bg = new Background({
			scene: this,
			x: 0,
			y: 0,
			key: 'bg'
		});

		// Timer
		this.timer = new Timer({
			scene: this,
			x: 5,
			y: 5,
			font: 'mariofont',
			maxTime: 30,
			key: 'timer'
		});
		this.timer.start();

		// Score
		this.score = new Score({
			scene: this,
			x: 345,
			y: 5,
			key: 'score1',
			font: 'mariofont'
		});

		// First round
		this.spawnCharacters();
	}

	spawnCharacters() {
		const {
			characterSize,
			padding,
			leftMargin,
			rightMargin,
			totalCharacters
		} = this.gridConfig;

		// 🔁 Destroy previous characters
		if (this.characters) this.characters.forEach(c => c.destroy(true));
		if (this.wantedCharacter) this.wantedCharacter.destroy(true);

		// 📏 Grid math
		const totalWidth = this.game.config.width;
		const spacingX = characterSize + padding;
		const spacingY = characterSize + padding;
		const availableWidth = totalWidth - leftMargin - rightMargin;
		const cols = Math.floor(availableWidth / spacingX);
		const startX = (totalWidth - cols * spacingX) / 2;
		const startY = this.game.config.height - (Math.ceil(totalCharacters / cols) * spacingY) - 20;

		const characterNames = ['luigi', 'mario', 'wario', 'yoshi'];

		// 🔀 Ensure different wanted character than previous
		let newWantedIndex;
		do {
			newWantedIndex = Phaser.Math.Between(0, 3);
		} while (newWantedIndex === this.previousWantedIndex);
		this.previousWantedIndex = newWantedIndex;

		const wantedCharacterIndex = Phaser.Math.Between(0, totalCharacters - 1);

		console.log(`🎯 New wanted: ${characterNames[newWantedIndex]} (index: ${newWantedIndex})`);

		// 👤 Create wanted character preview
		this.wantedCharacter = new Characters({
			scene: this,
			x: (this.game.config.width / 2) - 55,
			y: 110,
			key: 'characters-board',
			character: newWantedIndex,
			board: true
		});

		this.characters = [];

		for (let i = 0; i < totalCharacters; i++) {
			let charIndex;
			if (i === wantedCharacterIndex) {
				charIndex = newWantedIndex;
			} else {
				do {
					charIndex = Phaser.Math.Between(0, 3);
				} while (charIndex === newWantedIndex); // ❌ No duplicates
			}

			const row = Math.floor(i / cols);
			const col = i % cols;
			const x = startX + col * spacingX;
			const y = startY + row * spacingY;
			const isMatch = i === wantedCharacterIndex;

			const character = new Characters({
				scene: this,
				x,
				y,
				key: 'characters',
				character: charIndex,
				count: i,
				cssClass: 'game-character'
			});

			character.setInteractive().on('pointerdown', () => {
				if (isMatch) {
					this.score.oneUp();
					console.log('✅ Correct match!');
					this.spawnCharacters();
				} else {
					console.log('❌ Wrong character');
				}
			});

			this.characters.push(character);
		}
	}

	update(time, delta) {
		if (this.timer.hasStarted() && !this.timer.isRunning) {
			this.timer.stop();

			// Clean up game objects
			this.wantedCharacter.destroy(true);
			this.characters.forEach(c => c.destroy(true));

			// 🔴 Display game over message based on score
			this.score.gameover();

			// ⏱️ Delay transition to GameOverScene
			this.time.delayedCall(2000, () => {
				this.scene.start('GameOverScene', {
					score: this.score.currentScore
				});
			});
		}
	}
}
