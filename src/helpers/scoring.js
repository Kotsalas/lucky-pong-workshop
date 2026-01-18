export class ScoringHelper {
  constructor(scene) {
    this.scene = scene;
    this.leftScore = 0;
    this.rightScore = 0;
    this.winCondition = 5;

    const { width } = scene.scale;

    // Create sprites using the 'doodle-numbers' key
    this.leftScoreSprite = scene.add.sprite(width / 2 - 60, 50, 'doodle-numbers', 0);
    this.rightScoreSprite = scene.add.sprite(width / 2 + 60, 50, 'doodle-numbers', 0);
  }

  increment(side) {
    if (side === 'left') this.leftScore++;
    else this.rightScore++;

    this.updateDisplay();

    // Check for game reset
    if (this.leftScore >= this.winCondition || this.rightScore >= this.winCondition) {
      this.resetMatch();
      // Emit a custom event name 'GAME_OVER' and pass the winner side
      this.scene.events.emit('GAME_OVER', side);
    }
  }

  updateDisplay() {
    this.leftScoreSprite.setFrame(this.leftScore);
    this.rightScoreSprite.setFrame(this.rightScore);
  }

  resetMatch() {
    // Small delay so players see the final point before the jump back to 0
    this.scene.time.delayedCall(500, () => {
        this.leftScore = 0;
        this.rightScore = 0;
        this.updateDisplay();
    });
  }
}