import fs from "node:fs";
import { XMLParser } from "fast-xml-parser";
import r, { type Vector2, type Texture2D } from "raylib";
import Entity from "../entity.js";

abstract class GameMap extends Entity {
  #mapsDir: string;
  #name: string;
  #parsed: Record<string, any>;

  constructor(dir: string, name: string) {
    super({ x: 0, y: 0 });

    this.#mapsDir = dir;
    this.#name = name;

    this.#parsed = new XMLParser({
      ignoreAttributes: false,
      trimValues: true,
      attributeNamePrefix: "",
    }).parse(fs.readFileSync(`${dir}/${this.#name}.tmx`, { encoding: "utf8" })) as Record<
      string,
      any
    >;

    for (const tile of this.tilesets) {
      tile.image.raw = r.LoadTexture(`${this.#mapsDir}/${tile.image.source as string}`);
    }

    for (const layer of this.layers) {
      layer.data.parsed = (layer.data["#text"] as string)
        .split("\n")
        .map((row) => row.split(",").map(Number));
    }

    this.#parsed.map.objectgroup.object = this.colliders.map((collider) => ({
      ...collider,
      x: Number(collider.x),
      y: Number(collider.y),
      width: Number(collider.width),
      height: Number(collider.height),
    }));
  }

  get tilesets() {
    return this.#parsed.map.tileset as Array<Record<string, any>>;
  }

  get layers() {
    return this.#parsed.map.layer as Array<Record<string, any>>;
  }

  get colliders() {
    return this.#parsed.map.objectgroup.object as r.Rectangle[];
  }

  getTileImage(tileN: number) {
    let selected: Record<string, any> | undefined;

    for (const tile of this.tilesets) {
      if (tileN >= Number(tile.firstgid)) {
        selected = tile;
      }
    }

    if (!selected) {
      return;
    }

    tileN -= Number(selected.firstgid) === 0 ? 1 : Number(selected.firstgid);

    const tileX = (tileN % (Number(selected.image.width) / 16)) * 16;
    const tileY = Math.floor(tileN / (Number(selected.image.width) / 16)) * 16;

    return {
      texture: selected.image.raw as Texture2D,
      x: tileX,
      y: tileY,
      width: 16,
      height: 16,
    };
  }

  isCellCollidable(pos: Vector2) {
    for (const collider of this.colliders) {
      if (
        r.CheckCollisionRecs(
          { ...pos, width: 16, height: 16 },
          {
            x: collider.x,
            y: collider.y,
            width: collider.width,
            height: collider.height,
          },
        )
      ) {
        return true;
      }
    }

    return false;
  }

  renderLayer(name: string) {
    const l = this.layers.find(({ name: n }) => n === name);

    if (!l) {
      return;
    }

    let x = 0;
    let y = 0;
    for (const lines of l.data.parsed) {
      x = 0;

      for (const n of lines) {
        if (n === 0) {
          x += 16;
          continue;
        }

        const tile = this.getTileImage(n as number);

        if (!tile) {
          x += 16;
          continue;
        }

        r.DrawTexturePro(
          tile.texture,
          { x: tile.x, y: tile.y, width: tile.width, height: tile.height },
          { x, y, width: tile.width, height: tile.height },
          { x: 0, y: 0 },
          0,
          r.WHITE,
        );

        x += 16;
      }

      y += 16;
    }
  }

  renderColliders() {
    for (const c of this.colliders) {
      r.DrawRectangle(c.x, c.y, c.width, c.height, r.ColorAlpha(r.BLUE, 0.5));
    }
  }
}

export default GameMap;
