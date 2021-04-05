class GameScene extends Phaser.Scene
{
    constructor()
    {
        super({
            key: "GameScene",
        });

        // props
        this.tilesets = 0
    }

    init(data) 
    {
        this.tilesets = data.tilesets;
    }

    preload()
    {
        
    }

    create()
    {
        
    }

}