import { minBy, map } from 'lodash'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5)

    this.frame = 0;
    this.animations.add('walk_left', [2, 3, 4, 5], 10, true);
    this.animations.add('walk_right', [6, 7, 8, 9], 10, true);

    game.physics.arcade.enable([ this ], Phaser.Physics.ARCADE);
    this.body.setCircle(this.width / 2);

    this.inputEnabled = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.facing = "right";
  }

  update () {
    this.closestPlanet = minBy(this.game.planets.children, (planet) => this.distangeTo(planet) - planet.radius)

    this.rotation = game.physics.arcade.angleBetween(this, this.closestPlanet) - game.math.degToRad(90);
    this.onGround = this.distangeTo(this.closestPlanet) - this.height / 2 - 0.5 + 10 < this.closestPlanet.radius;

    if(this.onGround) {
      this.body.gravity.x = 0;
      this.body.gravity.y = 0;
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    } else {
      const angleToPlanet = this.rotation + game.math.degToRad(90);
      const gravityMag = 300;
      this.body.gravity.x = Math.cos(angleToPlanet) * gravityMag;
      this.body.gravity.y = Math.sin(angleToPlanet) * gravityMag;
    }

    let anim = "idle";

    const walkSpeed = this.onGround ? 200 : 10;
    let speed = 0;
    if(this.cursors.right.isDown) {
      speed = walkSpeed;
      anim = "walk";
      this.facing = "right";
    }
    if(this.cursors.left.isDown) {
      speed = -walkSpeed;
      anim = "walk";
      this.facing = "left";
    }
    const walkAngle = this.rotation;
    this.body.velocity.x += Math.cos(walkAngle) * speed;
    this.body.velocity.y += Math.sin(walkAngle) * speed;

    if(this.jumpButton.isDown && this.canJump()) {
      this.jump();
    }

    if(anim === 'walk') {
      this.animations.play(`walk_${this.facing}`);
    } else {
      this.animations.stop()
      if(this.facing === 'right') {
        this.frame = 1;
      } else {
        this.frame = 0;
      }
    }
  }

  jump() {
    const jumpMag = 200;
    const jumpAngle = this.rotation - game.math.degToRad(90);
    this.body.velocity.x += Math.cos(jumpAngle) * jumpMag;
    this.body.velocity.y += Math.sin(jumpAngle) * jumpMag;
  }

  canJump() {
    return this.onGround
  }

  distangeToSquared(obj) {
    const dy = obj.y - this.y;
    const dx = obj.x - this.x;
    return dy*dy + dx*dx;
  }

  distangeTo(obj) {
    return Math.sqrt(this.distangeToSquared(obj));
  }
};
