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
      if (this.entity.input !== this.entity.facing) {
        return "face";
      }

      const dir = this.entity.inputToDir(this.entity.input);
      if (
        this.entity.scene.map.isCellCollidable({
          x: this.entity.position.x + dir.x * 16,
          y: this.entity.position.y + dir.y * 16,
        })
      ) {
        return "idle";
      }

      return "walk";
    }

    return "idle";
  }
}

export default IdleBehaviour;
