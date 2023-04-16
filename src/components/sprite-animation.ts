import { type Vector2 } from "raylib";

export type Animation = {
  frames: Vector2[];
  loop: boolean;
  frameDuration: number;
};

class SpriteAnimation {
  #frame = 0;
  #frameCounter = 0;

  #activeAnimation;
  #animations: Record<string, Animation>;
  #frameCompleted = false;

  constructor(animations: Record<string, Animation>, active: string) {
    this.#activeAnimation = active;
    this.#animations = animations;
  }

  get active() {
    return this.#activeAnimation;
  }

  get frame(): Vector2 {
    if (!this.#activeAnimation) return { x: 0, y: 0 };
    if (!(this.#activeAnimation in this.#animations)) return { x: 0, y: 0 };

    return this.#animations[this.#activeAnimation].frames[this.#frame];
  }

  get completed() {
    return this.#frameCompleted;
  }

  playAnimation(anim: string) {
    if (this.#activeAnimation === anim) return;
    if (!(this.#activeAnimation in this.#animations)) return;

    this.#frame = 0;
    this.#frameCounter = 0;
    this.#activeAnimation = anim;
    this.#frameCompleted = false;
  }

  animate(dt: number) {
    if (!this.#activeAnimation) return;
    if (!(this.#activeAnimation in this.#animations)) return;

    const active = this.#animations[this.#activeAnimation];

    this.#frameCounter += dt;

    if (
      this.#frame >= active.frames.length - 1 &&
      this.#frameCounter >= active.frameDuration &&
      !active.loop
    ) {
      this.#frameCompleted = true;
      return;
    }

    if (this.#frameCounter >= active.frameDuration) {
      this.#frameCounter -= active.frameDuration;

      this.#frame += 1;
      this.#frame %= active.frames.length;
    }
  }
}

export default SpriteAnimation;
