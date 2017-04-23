import Phaser from 'phaser'

export default class extends Phaser.Graphics {
  constructor ({ game, x, y, diameter}) {
    super(game, x, y)
    this.diameter = diameter
    this.radius = diameter/2
    this.circle = new Phaser.Circle(0, 0, diameter);
    this.anchor.setTo(0.5)

    this.lineStyle(2, 0x333333, 1);
    this.beginFill(0xbbbbbb);
    this.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);
    this.endFill(0xbbbbbb);

    game.physics.arcade.enable([ this ], Phaser.Physics.ARCADE);
    this.body.setCircle(diameter/2);
    this.body.immovable = true;

    game.camera.follow(this.player);
  }
}
