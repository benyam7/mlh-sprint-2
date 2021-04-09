class LoaderScene extends Phaser.Scene {
  constructor() {
    super({
      key: "LoadingScene",
    });

    // props
    this.tilesets = 0;
  }

  init() {}

  preload() {
    this.loadMenuBackground();
    this.loadPlayer();
    this.loadTilesets();
    this.load.tilemapTiledJSON("env", "../assets/tilemap.json"); // load tilemap
    // loads audio
    this.load.audio("background_audio", "../assets/audio/simcity.mp3");

    // physically load assets contained in json map
    for (let i = 0; i < this.tilesets.length; i++) {
      let obj = this.tilesets[i];
      this.load.image(obj.name, obj.image);
    }

    var progressBar = this.add.graphics();
    var progressBox = this.add.graphics();

    var loadingText = this.make.text({
      x: gameWidth / 2,
      y: gameHeight / 2 - 50,
      text: "Loading...",
      style: {
        font: "30px monospace",
        fill: "#ffffff",
      },
    });

    loadingText.setScale(0.6);

    loadingText.setOrigin(0.5, 0.5);

    progressBox.fillStyle(0xffffff, 0.2);

    let pbSettings = {
      x: gameWidth / 6,
      y: gameHeight / 2,
      width: (4 * gameWidth) / 6,
      height: 30,
    };

    progressBox.fillRect(
      pbSettings["x"],
      pbSettings["y"],
      pbSettings["width"],
      pbSettings["height"]
    );

    this.load.on("progress", function (value) {
      progressBar.clear();
      progressBar.fillStyle(0x23aaee, 1);
      let factor = value == 0 ? 0 : -20;
      progressBar.fillRect(
        pbSettings["x"] + 10,
        pbSettings["y"] + 10,
        factor + pbSettings["width"] * value,
        pbSettings["height"] - 20
      );
    });    
  }

  create() {
    this.scene.start("MenuScene", { tileset: this.tilesets });
    let playMusic = true;
    let menumusic = this.sound.add("background_audio", { loop: true });
    if (playMusic) {
      menumusic.play();
    }
  }

  loadTilesets() {
    let json = $.ajax({
      url: "../assets/tilemap.json",
      dataType: "json",
      async: false,
    }).responseJSON;
    let tilesets = json["tilesets"];
    this.tilesets = tilesets.map((item) => {
      return {
        image: "../assets/" + item.image,
        gid: item.firstgid,
        name: item.name,
      };
    });
  }

  loadMenuBackground() {
    this.load.image("sky", "../assets/sky.png");
    this.load.image("houses", "../assets/houses.png");
    this.load.image("houses_one", "../assets/housesOne.png");
    this.load.image("houses_two", "../assets/housesTwo.png");
    this.load.image("fountain", "../assets/fountain.png");
    this.load.image("umbrela", "..//assets/umbrela.png");
    this.load.image("road", "../assets/road.png");
    this.load.image("play_button", "../assets/play.png");
    this.load.image("play_text", "../assets/play_text.png");
  }

  loadPlayer() {
    // this.load.image("player", "../assets/test.png");
    this.load.spritesheet("player_anim", "../assets/player_walk_anim.png", {
      frameWidth: 84,
      frameHeight: 128,
    });
  }
}
