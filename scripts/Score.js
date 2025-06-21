//Background class will load background image
export default class Score extends Phaser.GameObjects.BitmapText
{
	constructor(config)
	{
		super(config.scene, config.x, config.y, config.font, 'SCORE 00', 20);
		
		this.key = config.key;
        
        this.currentScore = 0;
        
		//Re-position origin
		this.setOrigin(0, 0);
		
		config.scene.add.existing(this);
	}
    
    oneUp()
    {
        this.currentScore++;
        
        if(this.currentScore < 10)
            this.setText('SCORE 0' + this.currentScore);
        else    
            this.setText('SCORE ' + this.currentScore);
        
        let pointLabel = new Phaser.GameObjects.BitmapText(this.scene, this.scene.searchCharacter.x + this.scene.searchCharacter.width, this.scene.searchCharacter.y, 'mariofont', '+1', 24);
        pointLabel.depth = 3;
        
        this.scene.add.existing(pointLabel);
        
        let timeline = this.scene.tweens.createTimeline();
        
        timeline.add(
        {
            targets: pointLabel,
            duration: 700,
            ease: 'Power1',
            y: pointLabel.y - 15,
        });
        
        timeline.add(
        {
            targets: pointLabel,
            duration: 300,
            ease: 'InOut',
            alpha: 0,
            onComplete: () =>
            {                
                pointLabel.destroy(true);
            }
        });
        
        timeline.play();
    }
    
    oneDown(x, y)
    {
        this.currentScore--;
        
        if(this.currentScore < 0)
            this.currentScore = 0;
        
        if(this.currentScore < 10)
            this.setText('SCORE 0' + this.currentScore);
        else    
            this.setText('SCORE ' + this.currentScore);
        
        let pointLabel = new Phaser.GameObjects.BitmapText(this.scene, x, y, 'mariofont', '-1', 24);
        pointLabel.depth = 3;
        
        this.scene.add.existing(pointLabel);
        
        let timeline = this.scene.tweens.createTimeline();
        
        timeline.add(
        {
            targets: pointLabel,
            duration: 700,
            ease: 'Power1',
            y: pointLabel.y - 15,
        });
        
        timeline.add(
        {
            targets: pointLabel,
            duration: 300,
            ease: 'InOut',
            alpha: 0,
            onComplete: () =>
            {                
                pointLabel.destroy(true);   
            }
        });
        
        timeline.play();
		
        this.scene.cameras.main.shake(100, 0.01);
    }
    
    gameover()
    {
        let message;
        
        if(this.currentScore >= 10)
            message = 'YOU WIN';
        else if(this.currentScore < 10)
            message = 'YOU LOSE'
        
        let messageLabel = new Phaser.GameObjects.BitmapText(this.scene, 175, 550, 'mariofont', message, 24);
        messageLabel.depth = 3;
        
        this.scene.add.existing(messageLabel);
    }
}