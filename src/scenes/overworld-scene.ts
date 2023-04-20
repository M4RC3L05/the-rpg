import r from "raylib";
import Player from "../entities/player/player.js";
import OverworldMap from "../entities/map/overworld-map.js";
import Scene from "./scene.js";

class OverworldScene extends Scene {
  #player!: Player;

  override init() {
    this.#player = new Player();
    this.#player.scene = this;
    this.#player.init();
    this.#player.position = { x: 16 * 14, y: 16 * 18 };

    this.map = new OverworldMap();
    this.map.init();
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
    this.map.renderLayer("ground");
    this.map.renderLayer("paths");
    this.map.renderLayer("path_decors");
    this.map.renderLayer("housing_floor");
    this.map.renderLayer("vegetation_low");
    this.map.renderLayer("housing");
    this.map.renderLayer("housing_decor");
    this.map.renderLayer("walls");
    this.map.renderLayer("vegetation");
    this.#player.render();
    // This.map.renderColliders();

    // for (let y = 0; y <= 1080 / 8; y += 16) {
    //   r.DrawLine(0, y, 1920 / 8, y, r.WHITE);
    // }

    // for (let x = 0; x <= 1920 / 8; x += 16) {
    //   r.DrawLine(x, 0, x, 1080 / 8, r.WHITE);
    // }

    r.EndMode2D();
  }
}

export default OverworldScene;
