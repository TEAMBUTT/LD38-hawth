export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5)

    game.physics.p2.enable([this], true);
    this.body.setMaterial(game.playerMaterial);

    this.inputEnabled = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    console.log(this)
  }

  update () {
    if(this.cursors.right.isDown) {
      this.body.thrustRight(300);
    }
    if(this.cursors.left.isDown) {
      this.body.thrustLeft(300);
    }

    if(this.jumpButton.isDown && this.canJump()) {
      this.jump();
    }
  }

  jump() {
    this.body.moveForward(300);
  }

  canJump() {
    return this.onGround()
  }

  onGround() {
    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i = 0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++) {
      var c = game.physics.p2.world.narrowphase.contactEquations[i];

      if (c.bodyA === this.body.data || c.bodyB === this.body.data) {
        var d = p2.vec2.dot(c.normalA, yAxis); // Normal dot Y-axis
        if (c.bodyA === this.body.data) d *= -1;
        if (d > 0.5) result = true;
      }
    }

    return result;
  }

  accelerateToObject(obj) {
    const speed = 600;
    const angle = Math.atan2(obj.y - this.y, obj.x - this.x);
    const targetRotation = angle - game.math.degToRad(90);
    this.body.rotation = targetRotation;
    this.body.force.x = Math.cos(angle) * speed;
    this.body.force.y = Math.sin(angle) * speed;
  }
};
