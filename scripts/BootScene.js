import Button from './Button.js';

export default class BootScene extends Phaser.Scene {
	constructor() {
		super({ key: 'BootScene' });
	}

	preload() {
		//Load button spritesheet
		this.load.atlas('startButton', './images/startButton.png', './config/startButton.json');
		// Load the font for the game over text
		this.load.bitmapFont('mariofont', './fonts/mariofont.png', './fonts/mariofont.xml');
	}

	create() {
		console.log('✅ BootScene started');
		// this.scene.start('GameScene'); // start game right away for testing

		// Display "Game Title" text
		this.add.bitmapText(
			this.game.config.width / 2,
			this.game.config.height / 2 - 60,
			'mariofont',
			'WANTED',
			32
		).setOrigin(0.5);

		// Create the start button
		this.button = new Button(
		{
			scene: this,
			x: (this.game.config.width / 2) - 55,
			y: (this.game.config.height / 2) - 17,
			key: 'startButton'
		});
	}
}
