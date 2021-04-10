
const GamePointers = {
  panelGids: [1563, 1564, 1565, /* social-media-ad-panels */ 1567, 1568, 1569, 1571, 1572, 1573],
  smAdPanels: [1567, 1568, 1569, 1571, 1572, 1573],
  adBoxRefs: {1563: 'laptop', 1564: 'shoes', 1565: 'watch'}
}

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

    const map = this.make.tilemap({ key: "env" });

    // create objects layer

    this.objLayer = map.getObjectLayer("ObjectLayer1")["objects"];
    this.objsGroup = this.physics.add.staticGroup();

    this.objLayer.forEach((object) => {

        let posScale = 0.498
        let name = this.getObjPropertyFromGid(object.gid, "name");
        let obj = this.objsGroup.create(object.x, object.y, name);
        obj.name = name;
        obj.setScale(0.7);
        obj.enableBody = true;
        obj.body.immovable = true;
        obj.setX(Math.round(object.x * posScale));
        obj.setY(Math.round(object.y * posScale));


        if(GamePointers.panelGids.includes(object.gid)) // add panels here
        {
            this.createVisitButtons(obj.body.x * posScale, obj.body.y * posScale, object.gid)
            obj.setScale(0.6)

        }
    });

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

    // create misc buttons
  }

  update() {
    if (this.playerMovement.controls.direction === "left") {
      this.player.x -= 7;
      this.player.play("walk_left");
    } else if (this.playerMovement.controls.direction === "right") {
      this.player.x += 7;
      this.player.play("walk_right");
    }
  }

  createVisitButtons(x, y, gid)
  {
    let isSmAd = GamePointers.smAdPanels.includes(gid) // is it an add board near Social Media Company Building ?
    let upperBtnTxt = isSmAd?'Advertisement':'Visit Website'

    let progressBox = this.add.graphics();

    let pbSettings = {
      x: x,
      y: y - 40,
      width: 250,
      height: 30,
    };

    progressBox.fillStyle(0x1d1d1d, 1);


    const fillPBox = () => {
      progressBox.fillRect(
        pbSettings["x"],
        pbSettings["y"],
        pbSettings["width"],
        pbSettings["height"]
      );
    }

    fillPBox()

    let btnX = pbSettings.x + (pbSettings.width / 2)
    let btnY = pbSettings.y + (pbSettings.height / 2)

    const visitButton = this.add.text(btnX, btnY, upperBtnTxt, { fill: '#ffffff', fontSize: '15px', fontWeight: 'bold', fontFamily: 'curisve' });
    visitButton.setOrigin(0.5, 0.5)

    if(isSmAd) // no need to hover effect and click event
      return

    visitButton.setInteractive({ cursor: 'pointer' });

    visitButton.on('pointerover', ev => {
      progressBox.fillStyle(0x2d2d2d, 1);
      fillPBox()
    })

    visitButton.on('pointerout', ev => {
      progressBox.fillStyle(0x1d1d1d, 1);
      fillPBox()
    })

    visitButton.on('pointerup', ev => {
      // showBox of website
      showBox(GamePointers.adBoxRefs[gid], 'Cookies have been added to your browser')
    })
  }
}
