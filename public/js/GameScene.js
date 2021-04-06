class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    // props
    this.tilesets = 0;
  }

  init(data) {
    this.tilesets = data.tilesets;
    console.log(data, "in game1");
  }

  preload() {}

  create() {
    const map = this.make.tilemap({ key: "env" });
    const groundLayer = map.addTilesetImage("bg1");
    let tileLayer = map
      .createLayer("TileLayer1", [groundLayer], 0, 0)
      .setScale(0.5);
  }
}
