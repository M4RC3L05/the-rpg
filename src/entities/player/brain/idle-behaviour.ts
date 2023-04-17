import { BrainBehaviour } from "../../../components/brain.js";
import type Player from "../player.js";

class IdleBehaviour extends BrainBehaviour<Player> {
  override enter() {
    this.entity.spriteAnimation.playAnimation(
      `idle${this.entity.facing.slice(0, 1).toUpperCase()}${this.entity.facing.slice(1)}`,
    );
  }

  override update(dt: number) {
    this.entity.inputMoveAction();
    this.entity.spriteAnimation.animate(dt);
  }

  override next() {
    const actionTo = this.entity.input;

    if (actionTo !== "idle") {
      if (this.entity.input === this.entity.facing) {
        return "walk";
      }

      return "face";
    }

    return "idle";
  }
}

export default IdleBehaviour;
