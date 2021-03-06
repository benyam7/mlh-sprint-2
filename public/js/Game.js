var doDebug = false;
var gameHeight, gameWidth;

var playMusic = true;

var DEBUG = (err) => {
  if (doDebug) console.log(err);
};

$(() => {
  gameHeight = Math.floor($(document).height() * 0.975);
  gameWidth = Math.floor($(document).width() * 0.99);

  DEBUG(`game width = ${gameWidth}`);
  DEBUG(`game height = ${gameHeight}`);

  var config = {
    width: gameWidth,
    height: gameHeight,
    backgroundColor: 0x000,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 200 },
      },
    },
    scene: [LoaderScene, MenuScene, GameScene],
  };

  game = new Phaser.Game(config);
});
