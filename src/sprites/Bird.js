import { minBy, map } from 'lodash'

export default class extends Phaser.Sprite {
  constructor ({ game, x, y }) {
    super(game, x, y, 'bird')
    this.origin = new Phaser.Point(x, y)

    this.anchor.setTo(0.5, 0.5)

    this.animations.add('flap', [0,1,2,3,4,5], 5, true);
    this.animations.play('flap')

    game.physics.enable(this, Phaser.Physics.ARCADE);

    this.state = "waitForPlayer";

    this.ticks = Math.random() * 100
    //this.tween = game.add.tween(sprite).to( { y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);
  }

  update () {
    const target = this.game.player.birdTarget;
    if (!target) return;

    const distance = Phaser.Point.subtract(this.position, target).getMagnitude();

    if (this.state === "waitForPlayer") {
      if (distance < 200) {
        this.state = "followPlayer";
        this.moveToPlayer()
      }
    } else if(this.state === "followPlayer") {
      if(Math.random() < 0.01 || distance > 400) {
        this.moveToPlayer()
      }

      this.rotation = (Math.sin(this.ticks / 10)/4) % (2 * Math.PI);


      this.ticks += Math.random() * 2;
    }
  }

  moveToPlayer() {
    const target = this.game.player.birdTarget;
    const circle = new Phaser.Ellipse(target.x, target.y, 256, 128);
    this.target = circle.random()

    game.physics.arcade.moveToXY(this, this.target.x, this.target.y, 100);
  }
};
