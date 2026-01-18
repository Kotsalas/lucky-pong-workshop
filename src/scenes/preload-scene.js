import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    // 1. Basic Background
    this.load.image('basic-game-background', 'images/basic-game-background.png');

    // 2. Core Gameplay Assets
    this.load.spritesheet('tennis-ball', 'images/tennis-ball.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('orange-paddle', 'images/orange-paddle.png', {
      frameWidth: 208,
      frameHeight: 48,
    });
    this.load.spritesheet('purple-paddle', 'images/purple-paddle.png', {
      frameWidth: 208,
      frameHeight: 48,
    });

    // 3. UI Assets (For Score)
    this.load.spritesheet('doodle-numbers', 'images/doodle-numbers.png', {
      frameWidth: 32,
      frameHeight: 32,
    });

    // 4. Sound Assets
    this.load.audio('ball-hit', 'sound/tennis-ball-hit.mp3');
  }

  create() {
    this.#createAnimations();
    // Redirect straight to your GameScene instead of ModeSelect
    this.scene.start('GameScene'); 
  }

  #createAnimations() {
    const data = this.cache.json.get('animations_json');
    if (!data) return;
    
    data.forEach((animation) => {
      if (this.anims.exists(animation.key)) return;
      
      // Basic check for the tennis-ball animation needed for the workshop
      const frames = this.anims.generateFrameNumbers(animation.assetKey, animation.frameRange || {});
      this.anims.create({
        key: animation.key,
        frames: frames,
        frameRate: animation.frameRate,
        repeat: animation.repeat,
      });
    });
  }
}