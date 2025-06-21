import Background from './Background.js';
import Timer from './Timer.js';
import Score from './Score.js';
import Characters from './Characters.js';

export default class GameScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameScene' }); // ✅ Hardcoded key (standard Phaser pattern)
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
		const config = {
			characterSize: 20,
			padding: 20,
			leftMargin: 5,
			rightMargin: 30,
			topMargin: 380,
			totalCharacters: 99
		};

		this.bg = new Background({
			scene: this,
			x: 0,
			y: 0,
			key: 'bg'
		});

		this.timer = new Timer({
			scene: this,
			x: 5,
			y: 5,
			font: 'mariofont',
			maxTime: 3,
			key: 'timer'
		});
		this.timer.start();

		this.score = new Score({
			scene: this,
			x: 345,
			y: 5,
			key: 'score1',
			font: 'mariofont'
		});

		const characterNames = ['luigi', 'mario', 'wario', 'yoshi'];
		const wantedIndex = Phaser.Math.Between(0, 3);
		console.log(`Wanted character is: ${wantedIndex} ${characterNames[wantedIndex]}`);

		this.wantedCharacter = new Characters({
			scene: this,
			x: (this.game.config.width / 2) - 55,
			y: 110,
			key: 'characters-board',
			character: wantedIndex,
			board: true
		});

		const totalWidth = this.game.config.width;
		const availableWidth = totalWidth - config.leftMargin - config.rightMargin;
		const spacingX = config.characterSize + config.padding;
		const spacingY = config.characterSize + config.padding;

		const cols = Math.floor(availableWidth / spacingX);
		const startX = (totalWidth - (cols * spacingX)) / 2;
		const startY = this.game.config.height - (Math.ceil(config.totalCharacters / cols) * spacingY) - 20;

		const wantedCharacterIndex = Phaser.Math.Between(0, config.totalCharacters - 1);
		this.characters = [];

		for (let i = 0; i < config.totalCharacters; i++) {
			let characterIndex;

			if (i === wantedCharacterIndex) {
				characterIndex = wantedIndex;
			} else {
				
				do {
					characterIndex = Phaser.Math.Between(0, 3);
				} while (characterIndex === wantedIndex);
			}

			const row = Math.floor(i / cols);
			const col = i % cols;
			const x = startX + col * spacingX;
			const y = startY + row * spacingY;

			const character = new Characters({
				scene: this,
				x,
				y,
				key: 'characters',
				character: characterIndex,
				count: i,
				cssClass: 'game-character'
			});

			// if (i === wantedCharacterIndex) {
			// 	character.setDepth(10); 
			// } else {
			// 	character.setDepth(1);
			// }

			console.log(`Character #${i}: ${character.getName()} ${i === wantedCharacterIndex ? '<-- MATCH' : ''}`);
			this.characters.push(character);
		}
	}

	update(time, delta) {
		if (this.timer.hasStarted() && !this.timer.isRunning) {
			this.timer.stop();
			this.wantedCharacter.destroy(true);
			this.characters.forEach(c => c.destroy(true));

			// Transition to GameOverScene and pass score
			this.scene.start('GameOverScene', {
				score: this.score.currentScore
			});
		}
	}
}

