import { type Vector2 } from "raylib";

abstract class Entity {
  position: Vector2;

  constructor(position?: Vector2) {
    this.position = position ?? { x: 0, y: 0 };
  }

  init() {
    //
  }

  update(dt: number) {
    //
  }

  fixedUpdate(dt: number) {
    //
  }

  lateUpdate(dt: number) {
    //
  }

  render() {
    //
  }

  exit() {
    //
  }
}

export default Entity;
