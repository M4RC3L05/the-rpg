import { BrainBehaviour } from "../../../components/brain.js";
import type Player from "../player.js";

class FaceBehaviour extends BrainBehaviour<Player> {
  override enter() {
    this.entity.spriteAnimation.playAnimation(
      `face${this.entity.input.slice(0, 1).toUpperCase()}${this.entity.input.slice(1)}`,
    );
    this.entity.face(this.entity.input);
  }

  override update(dt: number) {
    this.entity.inputMoveAction();
    this.entity.spriteAnimation.animate(dt);
  }

  override next() {
    if (this.entity.spriteAnimation.completed) {
      const actionTo = this.entity.input;

      if (actionTo === "idle") {
        return "idle";
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

    return "face";
  }
}

export default FaceBehaviour;
