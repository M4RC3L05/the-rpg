import r, { type Texture2D } from "raylib";
import Scene from "./scene.js";

class GrassArenaScene extends Scene {
  #bg!: Texture2D;
  #pos = { x: 0, y: 0 };

  override init() {
    const tile = r.LoadTexture("./assets/maps/overworld_grounds.png");
    const tilesPerRow = 1920 / 8 / 16 + 2;
    const tilesPerColumn = 1080 / 8 / 16 + 2;

    const temporary = r.LoadRenderTexture(tilesPerRow * 16, tilesPerColumn * 16);

    r.BeginTextureMode(temporary);
    for (let i = 0; i < tilesPerRow; i++) {
      for (let j = 0; j < tilesPerColumn; j++) {
        r.DrawTexturePro(
          tile,
          { x: 7 * 16, y: 7 * 16, width: 16, height: 16 },
          { x: i * 16, y: j * 16, width: 16, height: 16 },
          { x: 0, y: 0 },
          0,
          r.WHITE,
        );
      }
    }

    r.EndTextureMode();

    this.#bg = temporary.texture;
    r.UnloadTexture(tile);
  }

  override update(dt: number) {
    //
  }

  override fixedUpdate(dt: number) {
    if (r.IsKeyDown(r.KEY_W)) {
      this.#pos.y -= 1;
    }

    if (r.IsKeyDown(r.KEY_S)) {
      this.#pos.y += 1;
    }

    if (r.IsKeyDown(r.KEY_A)) {
      this.#pos.x -= 1;
    }

    if (r.IsKeyDown(r.KEY_D)) {
      this.#pos.x += 1;
    }
  }

  override lateUpdate(dt: number) {
    //
  }

  override render() {
    this.camera.target = { ...this.#pos };
    r.ClearBackground(r.WHITE);

    r.BeginMode2D(this.camera);

    const extra = {
      x: Math.floor(this.#pos.x / this.#bg.width) * this.#bg.width,
      y: Math.floor(this.#pos.y / this.#bg.height) * this.#bg.height,
    };

    // Top
    r.DrawTexture(this.#bg, -this.#bg.width + extra.x, -this.#bg.height + extra.y, r.WHITE);
    r.DrawTexture(this.#bg, 0 + extra.x, -this.#bg.height + extra.y, r.WHITE);
    r.DrawTexture(this.#bg, this.#bg.width + extra.x, -this.#bg.height + extra.y, r.WHITE);

    // Center
    r.DrawTexture(this.#bg, -this.#bg.width + extra.x, 0 + extra.y, r.WHITE);
    r.DrawTexture(this.#bg, 0 + extra.x, 0 + extra.y, r.WHITE);
    r.DrawTexture(this.#bg, this.#bg.width + extra.x, 0 + extra.y, r.WHITE);

    // Bottom
    r.DrawTexture(this.#bg, -this.#bg.width + extra.x, this.#bg.height + extra.y, r.WHITE);
    r.DrawTexture(this.#bg, 0 + extra.x, this.#bg.height + extra.y, r.WHITE);
    r.DrawTexture(this.#bg, this.#bg.width + extra.x, this.#bg.height + extra.y, r.WHITE);

    r.DrawRectangle(this.camera.target.x - 2, this.camera.target.y - 2, 5, 5, r.PURPLE);

    r.EndMode2D();
  }
}

export default GrassArenaScene;
