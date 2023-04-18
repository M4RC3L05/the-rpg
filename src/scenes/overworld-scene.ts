import r from "raylib";
import Player from "../entities/player/player.js";
import GameMap from "../entities/map/map.js";
import Scene from "./scene.js";

class OverworldScene extends Scene {
  #player!: Player;
  #map!: GameMap;

  override init() {
    this.#player = new Player();
    this.#player.init();
    this.#player.position = { x: 100, y: 100 };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.#map = new GameMap("./assets/maps", "overworld");
    this.#map.init();
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
    this.#map.renderLayer("ground");
    this.#map.renderLayer("paths");
    this.#map.renderLayer("path_decors");
    this.#map.renderLayer("housing_floor");
    this.#map.renderLayer("housing");
    this.#map.renderLayer("housing_decor");
    this.#map.renderLayer("vegetation_low");
    this.#map.renderLayer("vegetation");
    this.#player.render();
    r.EndMode2D();
  }
}

export default OverworldScene;
