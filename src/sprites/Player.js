import { minBy, map } from 'lodash'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5, 0.75)

    this.frame = 0;
    this.animations.add('walk_left', [2, 3, 4, 5],  8, true);
    this.animations.add('walk_right', [6, 7, 8, 9], 8, true);

    game.physics.arcade.enable([ this ], Phaser.Physics.ARCADE);
    this.body.setCircle(16);
    this.body.offset.y = 32;

    this.inputEnabled = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    this.facing = "right";

    this.surfaceVelocity = new Phaser.Point();
  }

  update () {
    this.closestPlanet = minBy(this.game.planets.children, (planet) => this.distangeTo(planet) - planet.radius)

    const rotation = game.physics.arcade.angleBetween(this, this.closestPlanet) - game.math.degToRad(90);
    this.rotateTowards(rotation)

    const playerPlanetVector = new Phaser.Point.subtract(this.position, this.closestPlanet.position);
    const distanceToPlanet = playerPlanetVector.getMagnitude();

    const footSize = 10;
    this.onGround = distanceToPlanet - this.width / 2 - 1 + footSize < this.closestPlanet.radius;

    this.surfaceVelocity.copyFrom(this.body.velocity)
    this.surfaceVelocity.rotate(0, 0, -rotation)

    if(this.onGround) {
      this.surfaceVelocity.y = 0;
      const newPosition = playerPlanetVector.clone();
      newPosition.setMagnitude(this.closestPlanet.radius + this.width/2 - footSize)
      newPosition.add(this.closestPlanet.x, this.closestPlanet.y)
      this.position.copyFrom(newPosition)
    }

    const angleToPlanet = rotation + game.math.degToRad(90);
    const gravityMag = this.jumpButton.isDown ? 300 : 600;
    this.body.gravity.x = Math.cos(angleToPlanet) * gravityMag;
    this.body.gravity.y = Math.sin(angleToPlanet) * gravityMag;

    this.birdTarget = playerPlanetVector.clone();
    this.birdTarget.setMagnitude(this.birdTarget.getMagnitude() + 64 + 64)
    this.birdTarget.add(this.closestPlanet.x, this.closestPlanet.y)

    const walkSpeed = this.onGround ? 120 : 100;
    let speed = 0;
    if(this.cursors.right.isDown) {
      speed = walkSpeed;
      this.facing = "right";
    }
    if(this.cursors.left.isDown) {
      speed = -walkSpeed;
      this.facing = "left";
    }
    this.surfaceVelocity.x = speed

    if(this.jumpButton.isDown && this.canJump()) {
      this.jump();
    }

    if(this.onGround && (this.surfaceVelocity.x < -10 || this.surfaceVelocity.x > 10)) {
      this.animations.play(`walk_${this.facing}`);
    } else {
      this.animations.stop()
      if(this.facing === 'right') {
        this.frame = 1;
      } else {
        this.frame = 0;
      }
    }

    this.body.velocity.copyFrom(this.surfaceVelocity);
    this.body.velocity = this.body.velocity.rotate(0, 0, rotation)
  }

  rotateTowards(target) {
    const speed = 0.2;
    const diff = ((3 * Math.PI + target - this.rotation) % (2 * Math.PI)) - Math.PI;

    if(Math.abs(diff) <= speed * 2) {
      this.rotation = target;
    } else if(diff > 0) {
      this.rotation += speed;
    } else {
      this.rotation -= speed;
    }
  }

  jump() {
    const jumpMag = 300;
    this.surfaceVelocity.y = -jumpMag;
  }

  canJump() {
    return this.onGround
  }

  distangeTo(obj) {
    return new Phaser.Point.subtract(this.position, obj.position).getMagnitude();
  }
};
