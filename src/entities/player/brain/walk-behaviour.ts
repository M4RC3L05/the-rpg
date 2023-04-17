import { BrainBehaviour } from "../../../components/brain.js";
import { type ActorDirection } from "../../actor/actor.js";
import type Player from "../player.js";

class WalkBehaviour extends BrainBehaviour<Player> {
  override enter() {
    this.entity.spriteAnimation.playAnimation(
      `walk${this.entity.input.slice(0, 1).toUpperCase()}${this.entity.input.slice(1)}`,
    );
  }

  override update(dt: number) {
    this.entity.inputMoveAction();
    this.entity.computeMoveDirection(this.entity.input as ActorDirection);

    if (this.entity.steps === 0) {
      if (this.entity.input !== "idle") this.entity.face(this.entity.input);

      this.entity.spriteAnimation.playAnimation(
        `walk${this.entity.input.slice(0, 1).toUpperCase()}${this.entity.input.slice(1)}`,
      );
    }

    this.entity.spriteAnimation.animate(dt);
  }

  override fixedUpdate(dt: number) {
    this.entity.moveCell();
  }

  override next() {
    if (this.entity.moving) return "walk";

    const actionTo = this.entity.input;

    if (actionTo === "idle") {
      return "idle";
    }

    return "walk";
  }
}

export default WalkBehaviour;
