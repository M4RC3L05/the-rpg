import type Entity from "../entities/entity.js";

export abstract class BrainBehaviour<E extends Entity = any> {
  constructor(public entity: E) {}

  enter() {
    //
  }

  update(dt: number) {
    //
  }

  fixedUpdate(dt: number) {
    //
  }

  leave() {
    //
  }

  abstract next(): string;
}

class Brain {
  #behaviours: Record<string, BrainBehaviour>;
  #activeBehaviour: string;

  constructor(behaviours: Record<string, BrainBehaviour>, active: string) {
    this.#behaviours = behaviours;
    this.#activeBehaviour = active;

    this.#behaviours[this.#activeBehaviour]?.enter();
  }

  update(dt: number) {
    this.#behaviours[this.#activeBehaviour]?.update(dt);
  }

  fixedUpdate(dt: number) {
    this.#behaviours[this.#activeBehaviour]?.fixedUpdate(dt);
  }

  lateUpdate(dt: number) {
    this.proceed();
  }

  proceed() {
    const next = this.#behaviours[this.#activeBehaviour]?.next();

    if (next === this.#activeBehaviour || !(next in this.#behaviours)) return;

    this.#behaviours[this.#activeBehaviour]?.leave();
    this.#activeBehaviour = next;
    this.#behaviours[this.#activeBehaviour]?.enter();
  }
}

export default Brain;
