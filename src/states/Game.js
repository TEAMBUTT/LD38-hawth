/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'
import Planet from '../sprites/Planet'
import Bird from '../sprites/Bird'
import BirdCount from '../sprites/BirdCount'
import Level from '../states/Level'

export default class extends Level {
  init () {}
  preload () {}

  loadLevel () {
    const diameter = 2000;
    this.addPlanet(
      this.world.centerX,
      this.world.centerY + diameter/2 + 32 + 5,
      diameter
    );

    const diameter2 = 200
    this.addPlanet(
      this.world.centerX + 300,
      this.world.centerY - 200,
      diameter2
    );

    this.addPlanet(
      this.world.centerX + 500,
      this.world.centerY - 200,
      diameter2
    );

    this.placePlayer(
      this.world.centerX,
      this.world.centerY,
    );

    for(let i = 0; i < 1; i++) {
      this.placeBird(this.world.centerX - 400, this.world.centerY - 100)
    }

    this.game.camera.x = this.player.x - this.camera.width / 2;
    this.game.camera.y = this.player.y - this.camera.height / 2;
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

    const bannerText = 'Le Petit Prince'
    let banner = this.add.text(this.world.centerX, this.world.centerY + 200, bannerText)
    banner.font = 'Engagement'
    banner.padding.set(10, 16)
    banner.fontSize = 60
    banner.fill = '#333333'
    banner.smoothed = true
    banner.anchor.setTo(0.5)
  }
}
