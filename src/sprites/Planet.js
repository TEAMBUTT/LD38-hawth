import Phaser from 'phaser'

export default class extends Phaser.Graphics {
  constructor ({ game, x, y, diameter}) {
    super(game, x, y)
    this.circle = new Phaser.Circle(0, 0, diameter);
    this.anchor.setTo(0.5)

    this.lineStyle(1, 0x333333, 1);
    this.beginFill(0xbbbbbb);
    this.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);
    this.endFill(0xbbbbbb);

    game.physics.p2.enable([ this ], true);
    this.body.setCircle(diameter/2);
    this.body.static = true;
    this.body.setMaterial(game.planetMaterial);

    game.camera.follow(this.player);
  }
}
