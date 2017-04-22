export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5)

    game.physics.p2.enable([this], true);

    this.body.collideWorldBounds = true;
    this.inputEnabled = true;

    this.MAX_SPEED = 500;
    this.ACCELERATION = 1500;
    this.DRAG = 600;
    // this.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED);

    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    console.log(this)
  }

  update () {
    if(this.cursors.right.isDown) {
      this.body.x += 3
    } else if(this.cursors.left.isDown) {
      this.body.x -= 3
    }

    if(this.jumpButton.isDown && this.canJump()) {
      this.body.moveUp(300);
    }
  }

  canJump() {
    return true
  }
};
