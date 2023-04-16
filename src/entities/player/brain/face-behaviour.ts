import { BrainBehaviour } from "../../../components/brain.js";
import { type ActorDirection } from "../../actor/actor.js";
import type Player from "../player.js";

class FaceBehaviour extends BrainBehaviour<Player> {
  override enter() {
    this.entity.spriteAnimation.playAnimation(
      `face${this.entity.input.slice(0, 1).toUpperCase()}${this.entity.input.slice(1)}`,
    );
    this.entity.face(this.entity.input as ActorDirection);
  }

  override update(dt: number): void {
    this.entity.inputMoveAction();
    this.entity.spriteAnimation.animate(dt);
  }

  override next(): string {
    if (this.entity.spriteAnimation.completed) {
      const actionTo = this.entity.input;

      if (actionTo === "idle") {
        return "idle";
      }

      return "walk";
    }

    return "face";
  }
}

export default FaceBehaviour;
