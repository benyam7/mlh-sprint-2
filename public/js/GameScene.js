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
    }

    preload() {

    }

    create() {
        const map = this.make.tilemap({ key: "env" });
        const groundLayer = map.addTilesetImage("bg1");
        let tileLayer = map
            .createLayer("TileLayer1", [groundLayer,], 0, 0)
            .setScale(0.5);

        // create objects layer

        this.objLayer = map.getObjectLayer("ObjectLayer1")["objects"];
        this.objsGroup = this.physics.add.group();

        this.objLayer.forEach((object) => {
            let name = this.getObjPropertyFromGid(object.gid, "name");
            let obj = this.objsGroup.create(object.x, object.y, name);
            obj.name = name;
            obj.setScale(0.79);
            obj.enableBody = true;
            obj.body.immovable = true;
            obj.setX(Math.round(object.x * 0.5));
            obj.setY(Math.round(object.y * 0.5));

        });

    }

    getObjPropertyFromGid(gid, prop) {
        for (let i = 0; i < this.tilesets.length; i++) {
            let obj = this.tilesets[i];
            if (obj.gid == gid) return obj[prop];
        }
    }

}
