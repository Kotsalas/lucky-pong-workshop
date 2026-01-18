import Phaser from 'phaser';

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
    this.body.setSize(30, 200); 
  }

  update(upKey, downKey) {
    if (upKey.isDown) {
      this.setVelocityY(-400);
    } else if (downKey.isDown) {
      this.setVelocityY(400);
    } else {
      this.setVelocityY(0);
    }
  }
}