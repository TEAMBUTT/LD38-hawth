/* globals __DEV__ */
import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'
import Planet from '../sprites/Planet'
import Bird from '../sprites/Bird'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    game.world.resize(5000, 5000);

    this.starfield = game.add.tileSprite(0, 0, game.camera.width, game.camera.height, 'starfield');
    this.starfield.fixedToCamera = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    const diameter = 2000;
    this.planet = new Planet({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY + diameter/2 + 32 + 5,
      diameter: diameter
    });
    this.game.add.existing(this.planet)

    const diameter2 = 200
    this.planet2 = new Planet({
      game: this,
      x: this.world.centerX + 300,
      y: this.world.centerY - 200,
      diameter: diameter2
    });
    this.game.add.existing(this.planet2)

    this.planet3 = new Planet({
      game: this,
      x: this.world.centerX + 500,
      y: this.world.centerY - 200,
      diameter: diameter2
    });
    this.game.add.existing(this.planet3)

    this.planets = this.game.add.group();
    this.game.planets = this.planets;
    this.planets.add(this.planet)
    this.planets.add(this.planet2)
    this.planets.add(this.planet3)

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
    });
    this.game.add.existing(this.player)
    this.game.player = this.player;

    for(let i = 0; i < 10; i++) {
      let bird = new Bird({
        game: this.game,
        x: this.world.centerX - 200,
        y: this.world.centerY - 200,
      });
      this.game.add.existing(bird);
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

  update() {
    const parallax = 16
    this.starfield.tilePosition.x = -this.player.x/parallax
    this.starfield.tilePosition.y = -this.player.y/parallax
  }

  render () {
    if (__DEV__) {
      this.game.debug.cameraInfo(game.camera, 32, 32);


      game.debug.body(this.player);
      //this.game.debug.spriteInfo(this.player, 32, 32)
      this.game.debug.text("on ground? " + this.player.onGround, 32, 14 );
    }
  }
}
