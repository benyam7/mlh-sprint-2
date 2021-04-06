class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
  }

  init(data) {
    this.tilesets = data.tileset;
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;
    const totalWidth = width * 3000;

    const skyBg = this.add
      .image(width * 0.5, height * 0.5, "sky")
      .setScrollFactor(0);

    createAligned(this, totalWidth, "houses", 0.25);
    createAligned(this, totalWidth, "houses_two", 0.5);
    createAligned(this, totalWidth, "houses_one", 1);
    createAligned(this, totalWidth, "fountain", 1);
    createAligned(this, totalWidth, "umbrela", 1);
    createAligned(this, totalWidth, "road", 1.25);
    this.cameras.main.setBounds(0, 0, width * 3000, height);

    //   const playButton = this.add
    //   .image(
    //     this.game.renderer.width / 2,
    //     this.game.renderer.height / 2,
    //     "play_button"
    //   )
    //   .setDepth(1);
    // playButton.setScrollFactor(0);

    // const playButton = this.add
    //   .image(
    //     this.game.renderer.width / 2 - 100,
    //     this.game.renderer.height / 2,
    //     "play_button"
    //   )
    //   .setDepth(1);
    // playButton.setScale(0.6);
    // playButton.setScrollFactor(0);

    // playButton.setInteractive();

    // // playButton.on("pointerover", () => {
    // //   // animSprite.x = playButton.x - playButton.width / 2 - 10;
    // // console.log("hover")
    // // });

    // playButton.on("pointerup", () => {
    //   // this.scene.start("WaitingScene", { tilesets: this.tilesets });
    //   console.log("to the game");
    // });

    const playText = this.add
      .image(
        this.game.renderer.width / 2,
        this.game.renderer.height / 2,
        "play_text"
      )
      .setDepth(1);
    // playText.setScale();
    playText.setScrollFactor(0);

    playText.setInteractive();

    playText.on("pointerup", () => {
      this.scene.start("GameScene", { tilesets: this.tilesets });
    });
  }

  update() {
    const cam = this.cameras.main;
    const speed = 3;
    cam.scrollX += speed;
  }
}
