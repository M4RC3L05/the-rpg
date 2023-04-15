import r from "raylib";
import Player from "../entities/player.js";
import Scene from "./scene.js";

class TestScene extends Scene {
  #player!: Player;

  override init(): void {
    this.#player = new Player();
    this.#player.init();
  }

  override update(dt: number): void {
    this.#player.update(dt);
  }

  override fixedUpdate(dt: number): void {
    this.#player.fixedUpdate(dt);
  }

  override render(): void {
    this.camera.target = { ...this.#player.position };

    r.ClearBackground(r.BLACK);

    r.BeginMode2D(this.camera);
    for (let y = 0; y <= 1080 / 6; y += 16) {
      r.DrawLine(0, y, 1920 / 6, y, r.WHITE);
    }

    for (let x = 0; x <= 1920 / 6; x += 16) {
      r.DrawLine(x, 0, x, 1080 / 6, r.WHITE);
    }

    this.#player.render();
    r.EndMode2D();
  }
}

export default TestScene;
