export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5)

    game.physics.p2.enable([this], true);
    this.body.setMaterial(game.planetMaterial);

    this.inputEnabled = true;
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

  accelerateToObject(obj) {
    var speed = 600;
    var angle = Math.atan2(obj.y - this.y, obj.x - this.x);
    this.body.rotation = angle - game.math.degToRad(90);
    this.body.force.x = Math.cos(angle) * speed;
    this.body.force.y = Math.sin(angle) * speed;
  }
};
