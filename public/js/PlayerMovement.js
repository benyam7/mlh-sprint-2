class PlayerMovement {
  constructor(scene) {
    this.scene = scene;

    this.controls = {
      isHoldingRight: false,
      isHoldingLeft: false,
      direction: "",
    };
  }

  holdLeft() {
    this.controls.isHoldingLeft = true;
    this.controls.direction = "left";
  }

  holdRight() {
    this.controls.isHoldingRight = true;
    this.controls.direction = "right";
  }

  releaseLeft() {
    this.controls.isHoldingLeft = false;

    if (this.controls.isHoldingRight) {
      this.controls.direction = "right";
    } else {
      this.controls.direction = "";
    }
  }

  releaseRight() {
    this.controls.isHoldingRight = false;

    if (this.controls.isHoldingLeft) {
      this.controls.direction = "left";
    } else {
      this.controls.direction = "";
    }
  }

  setUpMovmentControls() {
    const left = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    left.on("down", () => {
      this.holdLeft();
      console.log(this.controls);
      console.log("left down");
    });
    left.on("up", () => {
      this.releaseLeft();
      console.log(this.controls);
      console.log("left up");
    });

    const right = this.scene.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    right.on("down", () => {
      this.holdRight();
      console.log(this.controls);
      console.log("right down");
    });

    right.on("up", () => {
      this.releaseRight();
      console.log(this.controls);
      console.log("right up");
    });
  }
}
