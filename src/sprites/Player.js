import { minBy, map } from 'lodash'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5)

    game.physics.arcade.enable([ this ], Phaser.Physics.ARCADE);
    this.body.setCircle(this.width / 2);

    this.inputEnabled = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update () {
    this.closestPlanet = minBy(this.game.planets.children, (planet) => this.distangeTo(planet) - planet.radius)

    //this.accelerateToObject(this.closestPlanet);

    this.rotation = game.physics.arcade.angleBetween(this, this.closestPlanet) - game.math.degToRad(90);
    this.onGround = this.distangeTo(this.closestPlanet) - this.height / 2 - 0.5 < this.closestPlanet.radius;

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

    const walkSpeed = this.onGround ? 200 : 10;
    let speed = 0;
    if(this.cursors.right.isDown) {
      speed = walkSpeed;
    }
    if(this.cursors.left.isDown) {
      speed = -walkSpeed;
    }
    const walkAngle = this.rotation;
    this.body.velocity.x += Math.cos(walkAngle) * speed;
    this.body.velocity.y += Math.sin(walkAngle) * speed;

    if(this.jumpButton.isDown && this.canJump()) {
      this.jump();
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

  accelerateToObject(obj) {
    if(!obj) return;

    const speed = 600;
    const angle = Math.atan2(obj.y - this.y, obj.x - this.x);
    const targetRotation = angle - game.math.degToRad(90);

    this.rotation = targetRotation;
    //this.body.force.x = Math.cos(angle) * speed;
    //this.body.force.y = Math.sin(angle) * speed;
  }
};
