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
    this.cameras.main.startFollow(this.player);
    // this.cameras.main.roundPixels = true;
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
    const totalWidth = width * 2000;

    const skyBg = this.add
      .image(width * 0.5, height * 0.5, "sky")
      .setScrollFactor(0);

    createAligned(this, totalWidth, "houses", 0.25);
    createAligned(this, totalWidth, "houses_two", 0.5);
    createAligned(this, totalWidth, "houses_one", 1);
    createAligned(this, totalWidth, "fountain", 1);
    createAligned(this, totalWidth, "umbrela", 1);
    createAligned(this, totalWidth, "road", 1.25);

    this.cameras.main.setBounds(0, 0, totalWidth, height);

    // createAligned(this, totalWidth, "road", 0.5);
  }

  getPlayer() {
    this.player = this.add
      .sprite(this.scale.width / 2, this.scale.height / 2 + 250, "player_anim")
      .setDepth(1);
    this.player.setScale(0.5);

    this.anims.create({
      key: "walk_right",
      frames: this.anims.generateFrameNumbers("player_anim", {
        frames: [3, 2],
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });

    this.anims.create({
      key: "walk_left",
      frames: this.anims.generateFrameNumbers("player_anim", {
        frames: [1, 0],
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    });
  }

  update() {
    if (this.playerMovement.controls.direction === "left") {
      this.player.x -= 2;
      this.player.play("walk_left");
    } else if (this.playerMovement.controls.direction === "right") {
      this.player.x += 2;
      this.player.play("walk_right");
    }
  }
}
