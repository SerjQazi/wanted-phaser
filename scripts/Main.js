import { CONFIG } from './Globals.js';

import Game from './Game.js';

//Add event listerner to monitor when the browser window loaded
//Create new game when window loaded
window.addEventListener('load', () =>
{
	window.game = new Game(CONFIG);
});