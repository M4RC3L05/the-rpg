import GameMap from "./map.js";

class OverworldMap extends GameMap {
  constructor() {
    super("./assets/maps", "overworld");
  }
}

export default OverworldMap;
