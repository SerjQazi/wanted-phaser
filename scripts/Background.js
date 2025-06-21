//Background class will load background image
export default class Background extends Phaser.GameObjects.Image
{
	constructor(config)
	{
		super(config.scene, config.x, config.y, config.key);
		
		this.key = config.key;
		
		//Re-position origin
		this.setOrigin(0, 0);
		
		config.scene.add.existing(this);
	}
}