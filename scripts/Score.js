export default class Score extends Phaser.GameObjects.BitmapText {
	constructor(config) {
		super(config.scene, config.x, config.y, config.font, 'SCORE 00', 20);

		this.scene = config.scene;
		this.key = config.key;
		this.currentScore = 0;

		this.setOrigin(0, 0);
		this.scene.add.existing(this);
	}

	updateScoreText() {
		const padded = this.currentScore < 10 ? `0${this.currentScore}` : this.currentScore;
		this.setText(`SCORE ${padded}`);
	}

	showPointLabel(text, x, y) {
		const pointLabel = new Phaser.GameObjects.BitmapText(this.scene, x, y, 'mariofont', text, 24);
		pointLabel.setDepth(3);
		this.scene.add.existing(pointLabel);

		const timeline = this.scene.tweens.createTimeline();
		timeline.add({
			targets: pointLabel,
			duration: 700,
			ease: 'Power1',
			y: y - 15
		});
		timeline.add({
			targets: pointLabel,
			duration: 300,
			ease: 'InOut',
			alpha: 0,
			onComplete: () => pointLabel.destroy(true)
		});
		timeline.play();
	}

	oneUp(x = 200, y = 300) {
		this.currentScore++;
		this.updateScoreText();
		this.showPointLabel('+1', x, y);
	}

	oneDown(x = 200, y = 300) {
		this.currentScore = Math.max(0, this.currentScore - 1);
		this.updateScoreText();
		this.showPointLabel('-1', x, y);
		this.scene.cameras.main.shake(100, 0.01);
	}

	gameover() {
		const message = this.currentScore >= 10 ? 'YOU WIN' : 'YOU LOSE';
		const messageLabel = new Phaser.GameObjects.BitmapText(
			this.scene,
			this.scene.game.config.width / 2 - 70,
			550,
			'mariofont',
			message,
			24
		);
		messageLabel.setDepth(3);
		this.scene.add.existing(messageLabel);
	}
}
