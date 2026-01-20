import Phaser from 'phaser';
import { BALL_OFFSET, BALL_RADIUS, BALL_VELOCITY } from '../config';

export class Ball extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.body.setCircle(BALL_RADIUS, BALL_OFFSET, BALL_OFFSET);

    this.setBounce(1, 1);
    this.setCollideWorldBounds(true);
    this.body.onWorldBounds = true;
    this.anims.play('tennis-ball-spin');
  }

  reset() {
    this.setPosition(this.scene.scale.width / 2, this.scene.scale.height / 2);
    this.setVelocity(0, 0);

    this.scene.time.delayedCall(1000, () => {
      const xVel = Math.random() > 0.5 ? 350 : -350;
      const yVel = Phaser.Math.Between(-BALL_VELOCITY, BALL_VELOCITY);
      this.setVelocity(xVel, yVel);
    });
  }
}