# Workshop Mission: Operation Pong

The game is currently a "Ghost Town." The paddles move, the score stays at zero, and the court is empty. Your goal is to rebuild the **Ball** and the **Game Logic**.

---

## Phase 1: The Ball Class (`src/objects/ball.js`)
*Create this file and implement the following structure:*

### 1. The Blueprint
Extend the Phaser Sprite class. 
- **Hint:** `export class Ball extends Phaser.Physics.Arcade.Sprite`

### 2. The Constructor
Inside the `constructor(scene, x, y, texture)`, you must:
- [ ] Call `super()` to connect to the scene.
- [ ] Use `scene.add.existing(this)` to make it visible.
- [ ] Use `scene.physics.add.existing(this)` to give it a physical body.

### 3. Physics Setup
Make the ball behave like a ball:
- [ ] **Circular Body:** Use `this.body.setCircle(radius)` so it bounces realistically.
- [ ] **Bounciness:** Set `this.setBounce(1, 1)` for perfect elastic collisions.
- [ ] **World Bounds:** Use `this.setCollideWorldBounds(true)` so it doesn't leave the screen.
- [ ] **Sound Trigger:** Set `this.body.onWorldBounds = true` to allow the audio manager to hear wall hits.

---

## Phase 2: Integration (`src/scenes/game-scene.js`)
*Open the GameScene and "plug in" your new creation:*

### 1. Spawning
- [ ] Import the Ball at the top of the file.
- [ ] In `create()`, initialize it: `this.ball = new Ball(...)`.

### 2. Physics Rules
The ball will currently pass through the paddles like a ghost. 
- [ ] Add a **Collider**: `this.physics.add.collider(object1, object2, callback, null, this)`.
- [ ] Use the existing `handleBounce` function as your callback.

---

## Phase 3: Game Logic (`src/scenes/game-scene.js`)
*Make the game actually playable in the `update()` loop:*

### 1. Scoring
The ball knows where it is, but the game doesn't know when someone "lost."
- [ ] If `this.ball.x` is less than 0, the **Right Player** gets a point.
- [ ] If `this.ball.x` is greater than the screen width, the **Left Player** gets a point.
- [ ] **Hint:** Use the provided `this.handlePoint(side)` function.

### 2. Audio Feedback
- [ ] In your collision callback (`handleBounce`), emit the global event:
      `this.events.emit('BALL_COLLISION')`

---

## Bonus Challenges (If you finish early)
- [ ] **Speed Up:** Make the ball 10% faster every time it hits a paddle.
- [ ] **Screen Shake:** Add `this.cameras.main.shake(100, 0.005)