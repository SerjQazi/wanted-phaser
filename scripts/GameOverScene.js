import Button from './Button.js';

export default class GameOverScene extends Phaser.Scene {
	constructor() {
		super({ key: 'GameOverScene' });
	}

	init(data) {
		this.finalScore = data.score ?? 0;
		console.log('🟦 Final score received:', this.finalScore);
	}

	preload() {
		// Only preload assets if not already loaded in a previous scene
		// Load button spritesheet
		this.load.atlas('startButton', './images/startButton.png', './config/startButton.json');
		// Load the font for the game over text
		this.load.bitmapFont('mariofont', './fonts/mariofont.png', './fonts/mariofont.xml');
	}

	create() {
		this.cameras.main.setBackgroundColor('#111');

		console.log('🟥 GameOverScene loaded!');

		// Display "Game Over" text
		this.add.bitmapText(
			this.game.config.width / 2,
			this.game.config.height / 2 - 80,
			'mariofont',
			'GAME OVER',
			32
		).setOrigin(0.5);

		// Display final score
		this.add.bitmapText(
			this.game.config.width / 2,
			this.game.config.height / 2 - 30,
			'mariofont',
			'SCORE: ' + this.finalScore,
			24
		).setOrigin(0.5);

		// Restart button
		const restartButton = new Button({
			scene: this,
			x: this.game.config.width / 2 - 55,
			y: this.game.config.height / 2 + 50,
			key: 'startButton'
		});

		restartButton.setInteractive().on('pointerdown', () => {
			this.scene.start('GameScene');
		});
	}
}
