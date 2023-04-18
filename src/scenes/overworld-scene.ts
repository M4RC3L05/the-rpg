import r from "raylib";
import Player from "../entities/player/player.js";
import Scene from "./scene.js";

class OverworldScene extends Scene {
  #player!: Player;

  override init() {
    this.#player = new Player();
    this.#player.init();
  }

  override update(dt: number) {
    this.#player.update(dt);
  }

  override fixedUpdate(dt: number) {
    this.#player.fixedUpdate(dt);
  }

  override lateUpdate(dt: number) {
    this.#player.lateUpdate(dt);
  }

  override render() {
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

export default OverworldScene;
