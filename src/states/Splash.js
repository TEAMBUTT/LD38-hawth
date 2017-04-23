import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.spritesheet('player', 'assets/images/petitprince_sheet.png', 32, 64, 10);
    this.load.spritesheet('bird', 'assets/images/bird.png', 32, 32);
    this.load.image('starfield', 'assets/images/starmap.png')
  }

  create () {
    this.state.start('Game')
  }
}
