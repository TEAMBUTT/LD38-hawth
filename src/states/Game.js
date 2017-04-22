/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'
import Planet from '../sprites/Planet'

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

    var starfield = game.add.tileSprite(0, 0, 800, 600, 'starfield');
    starfield.fixedToCamera = true;

    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.planetMaterial = game.physics.p2.createMaterial('planetMaterial');
    this.playerMaterial = game.physics.p2.createMaterial('planetMaterial');

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

    this.game.add.existing(this.player)
    game.camera.follow(this.player);

    const diameter = 200;
    this.planet = new Planet({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY + diameter/2 + 32 + 5,
      diameter: diameter
    });
    this.game.add.existing(this.planet)
  }

  update() {
    this.player.accelerateToObject(this.planet);
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
