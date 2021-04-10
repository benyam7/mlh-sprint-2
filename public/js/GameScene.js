
const GamePointers = {
  panelGids: [1563, 1564, 1565, /* social-media-ad-panels */ 1567, 1568, 1569, 1570, 1571, 1572, 1573],
  smAdPanels: [1567, 1568, 1569, 1571, 1572, 1573],

  shoesAdGids: [1569, 1570, 1571],
  watchesAdGids: [1572, 1573],
  laptopsAdGids: [1567, 1568, 1569], 

  shoePanelGid: 1564,
  laptopPanelGid: 1563,
  watchPanelGid: 1565,
  adBoxRefs: {1563: 'laptop', 1564: 'shoes', 1565: 'watch'},
  gameChapters: ['I: How Social Media Companies use cookies for targeted advertising', ]
}

class GameScene extends Phaser.Scene {
  constructor() {
    super({
      key: "GameScene",
    });

    // props
    this.tilesets = 0;
    this.panels = {}

    // Labels
    this.chapterTitleLabel = null

    // play time
    this.seconds = 0
    this.minutes = 0

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

            if(GamePointers.smAdPanels.includes(object.gid))
            {
              this.panels[object.gid] = obj
              obj.visible = false // shoe them based on visited website
            }

        }
    });

    // Labels
    this.renderChapterTitle(GamePointers.gameChapters[0])
    this.renderPlayTime()
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


  renderPlayTime()
  {
  let box = this.add.graphics();
    let settings = {
      x: 5,
      y: 45,
      width: 146,
      height: 30,
    };
    box.fillStyle(0x1d1d1d, 1);
    box.setScrollFactor(0)
    this.fillPBox(box, settings)
    // hard code css ? Totally my thing
    this.pTimeLabel = this.add.text(10, 50, 'Play Time: 00:00', { fill: 'white', fontSize: '18px', fontWeight: 'bold', fontFamily: 'curisve' });
    this.pTimeLabel.setScrollFactor(0)

    setInterval(() => {
      if(this.seconds == 59) this.minutes++
      this.seconds = this.seconds==59?0:this.seconds+1
      let preMinZero = this.minutes < 10?'0':''
      let preSecZero = this.seconds < 10?'0':''

      this.pTimeLabel.setText(`Play Time: ${preMinZero}${this.minutes}:${preSecZero}${this.seconds}`)
    }, 1000);
  }

  renderChapterTitle(firstChapter)
  {
    let box = this.add.graphics();
    let settings = {
      x: 5,
      y: 5,
      width: 576,
      height: 30,
    };
    box.fillStyle(0x1d1d1d, 1);
    box.setScrollFactor(0)
    this.fillPBox(box, settings)
    // hard code css ? Totally my thing
    this.chapterTitleLabel = this.add.text(10, 10, 'Chapter ' + firstChapter, { fill: 'white', fontSize: '18px', fontWeight: 'bold', fontFamily: 'curisve' });
    this.chapterTitleLabel.setScrollFactor(0)
  }

  setChapterTitle(chapter)
  {
    this.chapterTitleLabel.setText('Chapter ' + chapter)
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

    this.fillPBox(progressBox, pbSettings)

    let btnX = pbSettings.x + (pbSettings.width / 2)
    let btnY = pbSettings.y + (pbSettings.height / 2)

    const visitButton = this.add.text(btnX, btnY, upperBtnTxt, { fill: '#ffffff', fontSize: '15px', fontWeight: 'bold', fontFamily: 'curisve' });
    visitButton.setOrigin(0.5, 0.5)

    if(isSmAd) // no need to hover effect and click event
      return

    visitButton.setInteractive({ cursor: 'pointer' });

    visitButton.on('pointerover', ev => {
      progressBox.fillStyle(0x2d2d2d, 1);
      this.fillPBox(progressBox, pbSettings)
    })

    visitButton.on('pointerout', ev => {
      progressBox.fillStyle(0x1d1d1d, 1);
      this.fillPBox(progressBox, pbSettings)
    })

    visitButton.on('pointerup', ev => {
      // showBox of website
      showBox(GamePointers.adBoxRefs[gid], 'Cookies have been added to your browser')
      switch (gid) {
        case GamePointers.shoePanelGid:
          this.panels[GamePointers.shoesAdGids[0]].visible = true
          this.panels[GamePointers.shoesAdGids[1]].visible = true
          break;

        case GamePointers.laptopPanelGid:
          this.panels[GamePointers.laptopsAdGids[0]].visible = true
          this.panels[GamePointers.laptopAsdGids[1]].visible = true
          break;

        case GamePointers.watchPanelGid:
          this.panels[GamePointers.watchesAdGids[0]].visible = true
          this.panels[GamePointers.watchesAdGids[1]].visible = true
          break;
      
        default:
          break;
      }
    })
  }

  fillPBox(_progressBox, _pbSettings){
      _progressBox.fillRect(
        _pbSettings["x"],
        _pbSettings["y"],
        _pbSettings["width"],
        _pbSettings["height"]
      );
    }

}
