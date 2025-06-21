import BootScene from './BootScene.js';
import GameScene from './GameScene.js';
import GameOverScene from './GameOverScene.js';

//Game class configures the scenes in the game
//Add more scenes to add more content
export default class Game extends Phaser.Game
{
	constructor(config)
	{
		super(config);

		this.scene.add('BootScene', new BootScene('BootScene'));
		this.scene.add('GameScene', new GameScene('GameScene'));
		this.scene.add('GameOverScene', new GameOverScene('GameOverScene'));

		this.scene.start('BootScene');
	}
}

// import BootScene from './BootScene.js';
// import GameScene from './GameScene.js';
// import GameOverScene from './GameOverScene.js';

// export default class Game extends Phaser.Game {
// 	constructor(config) {
// 		super({
// 			...config,
// 			scene: [BootScene, GameScene, GameOverScene] // ✅ Use scene array
// 		});
// 	}
// }
