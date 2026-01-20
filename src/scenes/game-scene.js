import Phaser from 'phaser';
import { Paddle } from '../objects/paddle';
import { ScoringHelper } from '../helpers/scoring';
import { AudioManager } from '../helpers/audio-manager';
import { GameState } from '../gameState';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const { width, height } = this.scale;
    this.add.image(width / 2, height / 2, 'basic-game-background');

    // Initialize the Audio Manager
    this.audio = new AudioManager(this);

    // 1. Initialize Helpers and Objects
    this.scoring = new ScoringHelper(this);
    this.leftPaddle = new Paddle(this, 50, height / 2, 'orange-paddle', true);
    this.rightPaddle = new Paddle(this, width - 50, height / 2, 'purple-paddle', false);

    // 2. Physics Rules
    this.physics.world.setBoundsCollision(false, false, true, true);

    // 3. Setup Controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.wasd = this.input.keyboard.addKeys({ up: 'W', down: 'S' });
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    // 4. Event Listener for Game Over
    this.events.on('GAME_OVER', (winner) => {
        console.log("Winner is: " + winner);
        this.showGameOver();
    });

    // UI for Pause (Hidden by default)
    this.pauseText = this.add.text(width / 2, height / 2, 'PAUSED', {
      fontSize: '64px',
      fill: '#fff'
    }).setOrigin(0.5).setVisible(false).setDepth(5);

    // Create Restart Menu
    this.createRestartMenu(width, height);
  }

  createRestartMenu(width, height) {
    this.overlay = this.add.rectangle(width/2, height/2, width, height, 0x000000, 0.7)
      .setVisible(false)
      .setDepth(10);
    
    this.restartButton = this.add.text(width / 2, height / 2, 'MATCH OVER - RESTART?', {
      fontSize: '32px',
      fill: '#fff',
      backgroundColor: '#333',
      padding: { x: 20, y: 10 }
    })
    .setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .setVisible(false)
    .setDepth(11);

    this.restartButton.on('pointerdown', () => this.restartGame());
  }

  update() {
    // 1. Check for Pause Toggle (JustDown ensures it only triggers once per press)
    if (Phaser.Input.Keyboard.JustDown(this.escKey) && !GameState.isGameOver) {
      this.togglePause();
    }

    if (GameState.isPaused || GameState.isGameOver) return;

    // Delegate movement to the objects
    this.leftPaddle.update(this.wasd.up, this.wasd.down);
    this.rightPaddle.update(this.cursors.up, this.cursors.down);
  }

  togglePause() {
    GameState.isPaused = !GameState.isPaused;

    if (GameState.isPaused) {
      this.physics.world.pause();
      this.pauseText.setVisible(true);
    } else {
      this.physics.world.resume();
      this.pauseText.setVisible(false);
    }
  }

  handlePoint(side) {
    const gameOver = this.scoring.increment(side);
    
    if (gameOver) {
      this.showGameOver();
    } else {
      // reset ball
    }
  }

  showGameOver() {
    GameState.isGameOver = true;
    this.physics.world.pause(); 
    this.overlay.setVisible(true);
    this.restartButton.setVisible(true);
  }

  restartGame() {
    GameState.isGameOver = false;
    this.physics.world.resume();
    this.scoring.resetMatch();
    this.overlay.setVisible(false);
    this.restartButton.setVisible(false);
    this.ball.reset();
  }

  // handleBounce(ball, paddle) {
  //   const diff = ball.y - paddle.y;
  //   ball.setVelocityY(10 * diff);

  //   // Create particle effect at the collision point
  //   const emitter = this.add.particles(ball.x, ball.y, 'tennis-ball', {
  //       speed: { min: -200, max: 200 },
  //       angle: { min: 0, max: 360 },
  //       scale: { start: 0.1, end: 0 },
  //       blendMode: 'ADD',
  //       lifespan: 500,
  //       stopAfter: 10
  //   });
  // }
}