import r, { type Texture } from "raylib";
import Entity from "./entity.js";

class Player extends Entity {
  #sprite!: Texture;
  #inputStack = new Set<number>();
  #moving = false;
  #dir = { x: 0, y: 0 };
  #steps = 0;

  override init() {
    this.#sprite = r.LoadTexture("./assets/player.png");
  }

  override update(dt: number) {
    this.#getMovementDirection();
  }

  override fixedUpdate(dt: number) {
    this.#move();
  }

  override render() {
    r.DrawTexturePro(
      this.#sprite,
      { x: 24, y: 0, width: 24, height: 24 },
      { ...this.position, width: 24, height: 24 },
      { x: 4, y: 12 },
      0,
      r.WHITE,
    );
  }

  #getMovementDirection() {
    if (this.#moving) return;

    this.#dir = { x: 0, y: 0 };

    if (r.IsKeyDown(r.KEY_W)) {
      this.#inputStack.add(r.KEY_W);
    } else {
      this.#inputStack.delete(r.KEY_W);
    }

    if (r.IsKeyDown(r.KEY_A)) {
      this.#inputStack.add(r.KEY_A);
    } else {
      this.#inputStack.delete(r.KEY_A);
    }

    if (r.IsKeyDown(r.KEY_D)) {
      this.#inputStack.add(r.KEY_D);
    } else {
      this.#inputStack.delete(r.KEY_D);
    }

    if (r.IsKeyDown(r.KEY_S)) {
      this.#inputStack.add(r.KEY_S);
    } else {
      this.#inputStack.delete(r.KEY_S);
    }

    switch ([...this.#inputStack.values()]!.at(-1)) {
      case r.KEY_W: {
        this.#dir = { x: 0, y: -1 };
        break;
      }

      case r.KEY_A: {
        this.#dir = { x: -1, y: 0 };
        break;
      }

      case r.KEY_D: {
        this.#dir = { x: 1, y: 0 };
        break;
      }

      case r.KEY_S: {
        this.#dir = { x: 0, y: 1 };
        break;
      }

      default: {
        break;
      }
    }

    if (this.#dir.x !== 0 || this.#dir.y !== 0) {
      this.#moving = true;
      this.#steps = 16;
    }
  }

  #move() {
    if (!this.#moving) return;
    if (this.#steps === 0) {
      this.#moving = false;
      return;
    }

    this.position.x += this.#dir.x;
    this.position.y += this.#dir.y;
    this.#steps -= 1;
  }
}

export default Player;
