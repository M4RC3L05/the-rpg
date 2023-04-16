import r from "raylib";
import Actor from "../actor/actor.js";
import Brain from "../../components/brain.js";
import WalkBehaviour from "./brain/walk-behaviour.js";
import IdleBehaviour from "./brain/idle-behaviour.js";
import FaceBehaviour from "./brain/face-behaviour.js";

class Player extends Actor {
  #inputStack = new Set<"up" | "down" | "left" | "right" | "idle">();
  #brain: Brain;

  constructor() {
    super("./assets/player.png");

    this.#inputStack.add("idle");
    this.#brain = new Brain(
      {
        walk: new WalkBehaviour(this),
        idle: new IdleBehaviour(this),
        face: new FaceBehaviour(this),
      },
      "idle",
    );
  }

  get input() {
    return [...this.#inputStack.values()]!.at(-1)!;
  }

  inputMoveAction() {
    if (r.IsKeyDown(r.KEY_W)) {
      this.#inputStack.add("up");
    } else {
      this.#inputStack.delete("up");
    }

    if (r.IsKeyDown(r.KEY_A)) {
      this.#inputStack.add("left");
    } else {
      this.#inputStack.delete("left");
    }

    if (r.IsKeyDown(r.KEY_D)) {
      this.#inputStack.add("right");
    } else {
      this.#inputStack.delete("right");
    }

    if (r.IsKeyDown(r.KEY_S)) {
      this.#inputStack.add("down");
    } else {
      this.#inputStack.delete("down");
    }
  }

  override update(dt: number) {
    this.#brain.update(dt);
  }

  override fixedUpdate(dt: number) {
    this.#brain.fixedUpdate(dt);
  }

  override lateUpdate(dt: number): void {
    this.#brain.lateUpdate(dt);
  }
}

export default Player;
