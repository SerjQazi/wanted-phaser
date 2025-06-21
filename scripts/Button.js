//Background class will load background image
export default class Button extends Phaser.GameObjects.Sprite
{
	constructor(config)
	{
		super(config.scene, config.x, config.y, config.key);
		
		this.key = config.key;
		
		this.isPressed = false;
		
		//Re-position origin
		this.setOrigin(0, 0);
        this.setInteractive();
		
        this.setFrame('startBtn1');
        
        this.addListener('pointerdown', this.onMouseDown);
		this.addListener('pointerup', this.onMouseUp);
        
        config.scene.add.existing(this);
	}
    
    onMouseDown(event)
    {
        this.setFrame('startBtn2');
    }
    
    onMouseUp(event) {
        this.isPressed = true;
        this.setFrame('startBtn1');
        console.log('Button pressed, starting GameScene');

        // Correct scene transition
        this.scene.scene.stop('BootScene');
        this.scene.scene.start('GameScene');

        // Clean up
        this.removeListener('pointerdown', this.onMouseDown);
        this.removeListener('pointerup', this.onMouseUp);
        this.destroy();
    }

}