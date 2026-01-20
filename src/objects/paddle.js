import Phaser from 'phaser';
import { PADDLE_HEIGHT, PADDLE_MOVE_VELOCITY, PADDLE_WIDTH } from '../config';

export class Paddle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture, isLeft) {
    super(scene, x, y, texture);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setImmovable(true);
    this.setCollideWorldBounds(true);
    this.setScale(0.5);
    this.setAngle(isLeft ? -90 : 90);
    
    // Set hitboxes (Width/Height flipped due to rotation)
    this.body.setSize(PADDLE_WIDTH, PADDLE_HEIGHT); 
  }

  update(upKey, downKey) {
    if (upKey.isDown) {
      this.setVelocityY(-PADDLE_MOVE_VELOCITY);
    } else if (downKey.isDown) {
      this.setVelocityY(PADDLE_MOVE_VELOCITY);
    } else {
      this.setVelocityY(0);
    }
  }
}