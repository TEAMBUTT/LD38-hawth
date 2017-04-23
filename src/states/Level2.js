/* globals __DEV__ */
import Phaser from 'phaser'
import Level from '../states/Level'

export default class extends Level {
  init () {}
  preload () {}

  loadLevel () {
    this.addPlanet(
      this.world.centerX,
      this.world.centerY + 250 + 32 + 5,
      100
    );

    this.placePlayer(
      this.world.centerX,
      this.world.centerY,
    );
  }
}
