import r from "raylib";
import type Scene from "./scenes/scene.js";
import TestScene from "./scenes/test-scene.js";

class Game {
  #scene!: Scene;

  init() {
    r.SetConfigFlags(r.FLAG_WINDOW_RESIZABLE);
    r.InitWindow(1920, 1080, "THE RPG");

    this.#scene = new TestScene();
    this.#scene.init();
  }

  update(dt: number) {
    this.#scene.update(dt);
  }

  fixedUpdate(dt: number) {
    this.#scene.fixedUpdate(dt);
  }

  lateUpdate(dt: number) {
    this.#scene.lateUpdate(dt);
  }

  render() {
    this.#scene.render();
  }

  start() {
    let acc = 0;

    while (!r.WindowShouldClose()) {
      this.update(r.GetFrameTime());

      acc += r.GetFrameTime();

      while (acc >= 1 / 60) {
        this.fixedUpdate(1 / 60);

        acc -= 1 / 60;
      }

      this.lateUpdate(r.GetFrameTime());

      this.#scene.camera.zoom = Math.min(
        (r.GetScreenWidth() / (1920 / 6)) * r.GetWindowScaleDPI().x,
        (r.GetScreenHeight() / (1080 / 6)) * r.GetWindowScaleDPI().y,
      );
      this.#scene.camera.offset = { x: r.GetScreenWidth() / 2, y: r.GetScreenHeight() / 2 };

      r.BeginDrawing();
      this.render();
      r.DrawFPS(10, 10);
      r.EndDrawing();
    }
  }

  terminate() {
    r.CloseWindow();
  }
}

export default Game;
