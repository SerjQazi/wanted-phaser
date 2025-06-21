//Game resolution
export const MAXWIDTH = 512;
export const MAXHEIGHT = 768;

//Creates an object used to configure the game
export const CONFIG = 
{
	type: Phaser.AUTO,
	width: MAXWIDTH,
	height: MAXHEIGHT,
	crisp: true,
	backgroundColor: 0x000000,
	roundPixels: true,
};