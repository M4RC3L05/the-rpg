import r, { type Vector2, type Texture2D, CheckCollisionBoxSphere } from "raylib";
import SpriteAnimation from "../../components/sprite-animation.js";
import Entity from "../entity.js";

export type ActorDirection = "up" | "down" | "left" | "right" | "idle";

class Actor extends Entity {
  #sprite: Texture2D;
  #spriteOrigin: Vector2;
  #spriteCellSize: Vector2;

  #dir = { x: 0, y: 0 };
  #steps = 0;
  #moving = false;
  #facing: ActorDirection = "down";

  #spriteAnimation: SpriteAnimation;

  constructor(sprite: string, spriteOrigin?: Vector2, spriteCellSize?: Vector2) {
    super();

    this.#sprite = r.LoadTexture(sprite);
    this.#spriteOrigin = spriteOrigin ?? { x: 4, y: 12 };
    this.#spriteCellSize = spriteCellSize ?? { x: 24, y: 24 };

    this.#spriteAnimation = new SpriteAnimation(
      {
        walkUp: {
          frames: [
            { x: 0, y: 3 },
            { x: 1, y: 3 },
            { x: 2, y: 3 },
            { x: 1, y: 3 },
          ],
          frameDuration: 0.1,
          loop: true,
        },
        walkDown: {
          frames: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 1, y: 0 },
          ],
          frameDuration: 0.1,
          loop: true,
        },
        walkLeft: {
          frames: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
            { x: 2, y: 1 },
            { x: 1, y: 1 },
          ],
          frameDuration: 0.1,
          loop: true,
        },
        walkRight: {
          frames: [
            { x: 0, y: 2 },
            { x: 1, y: 2 },
            { x: 2, y: 2 },
            { x: 1, y: 2 },
          ],
          frameDuration: 0.1,
          loop: true,
        },

        idleUp: { frames: [{ x: 1, y: 3 }], frameDuration: 0.1, loop: false },
        idleDown: { frames: [{ x: 1, y: 0 }], frameDuration: 0.1, loop: false },
        idleLeft: { frames: [{ x: 1, y: 1 }], frameDuration: 0.1, loop: false },
        idleRight: { frames: [{ x: 1, y: 2 }], frameDuration: 0.1, loop: false },

        faceUp: {
          frames: [
            { x: 0, y: 3 },
            { x: 1, y: 3 },
          ],
          frameDuration: 0.1,
          loop: false,
        },
        faceDown: {
          frames: [
            { x: 0, y: 0 },
            { x: 1, y: 0 },
          ],
          frameDuration: 0.1,
          loop: false,
        },
        faceLeft: {
          frames: [
            { x: 0, y: 1 },
            { x: 1, y: 1 },
          ],
          frameDuration: 0.1,
          loop: false,
        },
        faceRight: {
          frames: [
            { x: 0, y: 2 },
            { x: 1, y: 2 },
          ],
          frameDuration: 0.1,
          loop: false,
        },
      },
      "idleDown",
    );
  }

  get spriteAnimation() {
    return this.#spriteAnimation;
  }

  get moving() {
    return this.#moving;
  }

  get facing() {
    return this.#facing;
  }

  get steps() {
    return this.#steps;
  }

  face(dir: ActorDirection) {
    this.#facing = dir;
  }

  inputToDir(direction: ActorDirection) {
    switch (direction) {
      case "up": {
        return { x: 0, y: -1 };
      }

      case "left": {
        return { x: -1, y: 0 };
      }

      case "right": {
        return { x: 1, y: 0 };
      }

      case "down": {
        return { x: 0, y: 1 };
      }

      default: {
        return { x: 0, y: 0 };
      }
    }
  }

  computeMoveDirection(direction: ActorDirection) {
    if (this.#moving) return;

    this.#dir = this.inputToDir(direction);

    if (this.#dir.x !== 0 || this.#dir.y !== 0) {
      this.#moving = true;
      this.#steps = 16;
    }
  }

  moveCell() {
    if (!this.#moving) return;
    if (this.#steps === 0) {
      this.#moving = false;
      return;
    }

    this.position.x += this.#dir.x;
    this.position.y += this.#dir.y;
    this.#steps -= 1;
  }

  override render() {
    r.DrawTexturePro(
      this.#sprite,
      {
        x: this.#spriteAnimation.frame.x * this.#spriteCellSize.x,
        y: this.#spriteAnimation.frame.y * this.#spriteCellSize.y,
        width: this.#spriteCellSize.x,
        height: this.#spriteCellSize.y,
      },
      { ...this.position, width: this.#spriteCellSize.x, height: this.#spriteCellSize.y },
      this.#spriteOrigin,
      0,
      r.WHITE,
    );

    // R.DrawRectangle(this.position.x, this.position.y, 16, 16, r.ColorAlpha(r.PURPLE, 0.5));
  }
}

export default Actor;
