import { type Camera2D } from "raylib";

abstract class Scene {
  camera: Camera2D = { offset: { x: 0, y: 0 }, rotation: 0, target: { x: 0, y: 0 }, zoom: 1 };

  init() {
    this.camera = { offset: { x: 0, y: 0 }, rotation: 0, target: { x: 0, y: 0 }, zoom: 1 };
  }

  abstract update(dt: number): void;
  abstract fixedUpdate(dt: number): void;
  abstract lateUpdate(dt: number): void;
  abstract render(): void;
}

export default Scene;
