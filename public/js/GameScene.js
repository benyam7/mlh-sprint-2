class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    // props
    this.tilesets = 0;

    // player movement
    this.playerMovement = new PlayerMovement(this);
  }

  init(data) {
    this.tilesets = data.tilesets;
  }

  create() {
    this.movingBackground();
    this.getPlayer();
    // this.setUpMovmentControls();
    this.playerMovement.setUpMovmentControls();
  }

  getObjPropertyFromGid(gid, prop) {
    for (let i = 0; i < this.tilesets.length; i++) {
      let obj = this.tilesets[i];
      if (obj.gid == gid) return obj[prop];
    }
  }

  movingBackground() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 3000;

    const skyBg = this.add
      .image(width * 0.5, height * 0.5, "sky")
      .setScrollFactor(0);

    this.cameras.main.setBounds(0, 0, width * 3000, height);

    createAligned(this, totalWidth, "road", 1.25);
  }

  getPlayer() {
    this.player = this.add.image(100, 100, "player").setScrollFactor(1.25);
    this.player.setScale(0.5);
  }

  update() {
    if (this.playerMovement.controls.direction === "left") {
      this.player.setPosition(this.player.x - 5, this.player.y);
    } else if (this.playerMovement.controls.direction === "right") {
      this.player.setPosition(this.player.x + 5, this.player.y);
    }
  }
}
