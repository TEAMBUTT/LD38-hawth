import { minBy, map } from 'lodash'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'player')

    this.anchor.setTo(0.5)

    game.physics.p2.enable([this], true);
    this.body.setMaterial(game.playerMaterial);

    this.inputEnabled = true;
    this.cursors = game.input.keyboard.createCursorKeys();
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  }

  update () {
    this.closestPlanet = minBy(this.game.planets.children, (planet) => this.distangeTo(planet) - planet.radius)

    this.accelerateToObject(this.closestPlanet);

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
    if(!this.closestPlanet) return false;

    return this.distangeTo(this.closestPlanet) - this.height / 2 - 0.5 < this.closestPlanet.radius;
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
    this.body.rotation = targetRotation;
    this.body.force.x = Math.cos(angle) * speed;
    this.body.force.y = Math.sin(angle) * speed;
  }
};
