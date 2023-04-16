import { BrainBehaviour } from "../../../components/brain.js";
import { type ActorDirection } from "../../actor/actor.js";
import type Player from "../player.js";

class WalkBehaviour extends BrainBehaviour<Player> {
  override enter() {
    this.entity.spriteAnimation.playAnimation(
      `walk${this.entity.input.slice(0, 1).toUpperCase()}${this.entity.input.slice(1)}`,
    );
  }

  override update(dt: number): void {
    this.entity.inputMoveAction();
    this.entity.computeMoveDirection(this.entity.input as ActorDirection);
    this.entity.spriteAnimation.animate(dt);
  }

  override fixedUpdate(dt: number) {
    this.entity.moveCell();
  }

  override next(): string {
    if (this.entity.moving) return "walk";

    const actionTo = this.entity.input;

    if (actionTo === "idle") {
      return "idle";
    }

    if (this.entity.input !== this.entity.facing) {
      return "face";
    }

    return "walk";
  }
}

export default WalkBehaviour;
