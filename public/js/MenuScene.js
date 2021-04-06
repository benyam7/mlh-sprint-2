class MenuScene extends Phaser.Scene {
  constructor() {
    super({
      key: "MenuScene",
    });
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
  }

  update() {
    console.log("hello");
    const cam = this.cameras.main;
    const speed = 3;
    cam.scrollX += speed;
  }
}
