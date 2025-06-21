//Background class will load background image
export default class Timer extends Phaser.GameObjects.BitmapText
{
	constructor(config)
	{
	
        super(config.scene, config.x, config.y, config.font, 'TIMER 00:' + config.maxTime, 20);
		
		this.key = config.key;
		this.maxTime = config.maxTime;
        this.currentTime = config.maxTime;
        
        this.isRunning = false;
        
		//Re-position origin
		this.setOrigin(0, 0);
		
		config.scene.add.existing(this);
	}
    
    start()
    {
        this.scene.time.addEvent(
        {
            delay: 1000,
            repeat: this.maxTime,
            callback: this.updateTime,
            callbackScope: this
        });
        
        this.isRunning = true;
    }
    stop() {
		this.isRunning = false;
		if (this.timerEvent) {
			this.timerEvent.remove(false);
		}
	}
    
    hasStarted()
    {
        return this.currentTime != this.maxTime;
    }
    
    updateTime()
    {
        this.currentTime--;
        
        if(this.currentTime < 0)
            this.isRunning = false;
        else if(this.currentTime < 10)   
            this.setText('TIMER 00:0' + this.currentTime);
        else
            this.setText('TIMER 00:' + this.currentTime);
    }
}