//Background class will load background image
export default class Characters extends Phaser.GameObjects.Sprite
{
    characterArray = [ 'luigi', 'mario', 'wario', 'yoshi' ];

	constructor(config)
	{
		super(config.scene, config.x, config.y, config.key);
		
		this.key = config.key;
		
		if(config.board)
        	this.board = config.board;
		else
			this.board = false;
		
        this.currentCharacter = config.character;
		this.cssClass = config.cssClass || 'game-character';
        
		//Re-position origin
		this.setOrigin(0, 0);
		this.setInteractive();

        if(this.board)
            this.setFrame(this.getName() + '-board');
            // this.setFrame(this.getName() );
        else
            this.setFrame(this.getName());
		
		config.scene.add.existing(this);
	}

    getName()
    {
        return this.characterArray[this.currentCharacter];
    }
}