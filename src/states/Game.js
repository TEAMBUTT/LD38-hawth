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
    this.addPlanet(
      this.world.centerX,
      this.world.centerY + 250 + 32 + 5,
      500
    );

    for(let x = 500; x <= 2600; x += 300) {
      this.addPlanet(
        this.world.centerX + x,
        this.world.centerY + 500,
        200
      );
    }

    for(let x = 1400; x <= 2600; x+= 300) {
      this.placeBird(this.world.centerX + x, this.world.centerY + 300)
    }

    this.placePlayer(
      this.world.centerX + 1100,
      this.world.centerY + 300,
    );

    const bannerText = 'Le Petit Prince'
    let banner = this.add.text(this.world.centerX, this.world.centerY + 150, bannerText)
    banner.font = 'Engagement'
    banner.padding.set(10, 16)
    banner.fontSize = 60
    banner.fill = '#333333'
    banner.smoothed = true
    banner.anchor.setTo(0.5)
  }
}
