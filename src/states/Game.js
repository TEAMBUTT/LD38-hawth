/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Petit Prince of Persia'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.mushroom = new Mushroom({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'mushroom'
    })

    this.player = new Player({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
    });

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.LEFT,
      Phaser.Keyboard.RIGHT,
      Phaser.Keyboard.UP,
      Phaser.Keyboard.DOWN,
      Phaser.Keyboard.SPACE
    ]);

    this.game.add.existing(this.player)

    //var diameter = 5000;
    //this.circle = new Phaser.Circle(this.game.world.centerX, this.game.world.centerY + diameter/2, diameter);

    //var graphics = game.add.graphics(0, 0);
    //graphics.lineStyle(1, 0x333333, 1);
    //graphics.beginFill(0xbbbbbb);
    //graphics.drawCircle(this.circle.x, this.circle.y, this.circle.diameter);
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
      game.debug.body(this.player)
    }
  }
}
