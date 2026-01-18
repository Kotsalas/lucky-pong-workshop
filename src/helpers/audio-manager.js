export class AudioManager {
  constructor(scene) {
    this.scene = scene;

    // Listen for collision events emitted by the scene
    this.scene.events.on('BALL_COLLISION', () => {
      this.playHitSound();
    });
  }

  playHitSound() {
    // Generate a random rate between 0.8 and 1.2
    // 1.0 is the original pitch
    const randomRate = Phaser.Math.FloatBetween(0.8, 1.2);

    this.scene.sound.play('ball-hit', {
      volume: 1,
      rate: randomRate
    });
  }
}