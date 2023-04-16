import { BrainBehaviour } from "../../../components/brain.js";
import type Player from "../player.js";

class IdleBehaviour extends BrainBehaviour<Player> {
  override enter() {
    const animName = this.entity.spriteAnimation.active.startsWith("walk")
      ? this.entity.spriteAnimation.active.replace("walk", "")
      : this.entity.spriteAnimation.active.startsWith("face")
      ? this.entity.spriteAnimation.active.replace("face", "")
      : this.entity.spriteAnimation.active.startsWith("idle")
      ? this.entity.spriteAnimation.active.replace("idle", "")
      : "Down";
    this.entity.spriteAnimation.playAnimation(`idle${animName}`);
  }

  override update(dt: number): void {
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
