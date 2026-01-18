# lucky-pong-workshop
# Pong Workshop: Starter-Template

Welcome to the **Zone01 Athens** Phaser 3 Workshop! You have the court, the paddles, and the scoreboard, but there's a problem: **The game has no ball.**

Your mission today is to live-code the Ball object from scratch, integrate it into the physics engine, and handle the scoring logic.

## Essential Software
- Node.js (LTS Version): [nodejs.org](https://nodejs.org/en)
- A Code Editor: VS Code is the industry standard and recommended for the workshop.
- A Web Browser: Chrome or Firefox is best for using the "Inspect Element" console to debug physics.

## How to Run
1. **Clone the repository**:
    ```bash
    git clone https://github.com/Kotsalas/lucky-pong-workshop.git
    ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Launch the development server:**
    ```bash
    npm run dev
    ```
4. **Open your browser to the local URL provided by Vite (usually http://localhost:5173).**

## Project Architecture
This version uses a **Modular Design Pattern**. Instead of one giant file, the logic is separated into specific roles to keep the code organized and scalable.

### 📁 `src/objects/`
* **`paddle.js`**: Controls the physics body and keyboard input. Uses `setImmovable(true)` so the ball doesn't push the paddles out of bounds.

### 📁 `src/helpers/`
* **`scoring.js`**: Manages the match state (0-5) and updates the score using the `doodle-numbers` spritesheet. It emits the `GAME_OVER` event when a player wins.
* **`audio-manager.js`**: A dedicated listener that plays the `ball-hit` sound with a randomized pitch whenever a collision occurs.

### 📁 `src/scenes/`
* **`boot-scene.js`**: It starts a smooth transition towards loading the game and lets Preload scene load the final assets.
* **`preload-scene.js`**: Loads the final assets so the game-scene runs without problems.
* **`game-scene.js`**: The "Central Brain." It initializes all objects and coordinates high-level events like pausing, game over states, and point scoring.

---

## The Workshop Mission
* **Create the Missing Piece**: You will need to create <b>src/objects/ball.js</b>. We will build a class that extends Phaser.Physics.Arcade.Sprite.
    * **Concepts:** Constructors, super(), and adding objects to the Physics world.
    * **Physics:** Setting circular hitboxes (setCircle) and bounciness.
* **Connect the Brains**<br>
    The <b>game-scene.js</b> is waiting for ball. You will need to:
    * Import your new Ball class
    * "Spawn" it in the center of the screen.
    * Set up Colliders between the ball and the paddles.
* **Logic & Events**
    * **Scoring:** Detect when the ball goes off-screen to update the score.
    * **Audio:** Trigger the <b>BALL_COLLISION</b> event to hear the hit sounds.

## Got Stuck?
If you fall behind during the live coding, you can view the complete solution by switching to the <b>final-version</b> branch:
    ```bash
    git checkout final-version
    ```

<b>Happy Coding!</b> Built for the Zone01 Athens Workshop 2026.