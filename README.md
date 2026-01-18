# Pong Workshop: Final Version

Welcome to the completed version of the Phaser 3 Pong game! This branch contains the fully modular, event-driven code used in the **Zone01 Athens** workshop.

## Essential Software
- Node.js (LTS Version): [nodejs.org](https://nodejs.org/en)
- A Code Editor: VS Code is the industry standard and recommended for the workshop.
- A Web Browser: Chrome or Firefox is best for using the "Inspect Element" console to debug physics.

## How to Run
1. **Clone the repository**:
    ```bash
    git clone -b final-version https://github.com/Kotsalas/lucky-pong-workshop.git
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
* **`ball.js`**: Handles the circular physics body, the serve logic, and the spin animation.

### 📁 `src/helpers/`
* **`scoring.js`**: Manages the match state (0-5) and updates the score using the `doodle-numbers` spritesheet. It emits the `GAME_OVER` event when a player wins.
* **`audio-manager.js`**: A dedicated listener that plays the `ball-hit` sound with a randomized pitch whenever a collision occurs.

### 📁 `src/scenes/`
* **`game-scene.js`**: The "Central Brain." It initializes all objects and coordinates high-level events like pausing, game over states, and point scoring.

---

## Key Features
* **Circular Collisions**: The ball uses `body.setCircle` for realistic, arcade-style bounces.
* **Event-Driven Audio**: Sound is decoupled from the physics; it triggers via a global `BALL_COLLISION` event.
* **Pause System**: Press **ESC** to toggle `physics.world.pause()` and stop animations.
* **Win Condition**: First player to 5 points triggers a Game Over overlay with an interactive Restart button.

---

## "Damaged" version
* Clone the main branch of the repository and try to completet the challenges
    ```bash
    git clone https://github.com/Kotsalas/lucky-pong-workshop.git
    ```
