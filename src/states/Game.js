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

    game.world.resize(5000, 5000);

    this.starfield = game.add.tileSprite(-1024, -1024, 2048, 2048, 'starfield');
    this.starfield.fixedToCamera = true;

    this.game.physics.startSystem(Phaser.Physics.P2JS);


    //game.physics.p2.gravity.y = 100;
    game.physics.p2.restitution = 0.8;

    this.game.physics.p2.world.defaultContactMaterial.friction = 0.9;
    this.game.physics.p2.world.setGlobalStiffness(1e5);

    this.planetMaterial = game.physics.p2.createMaterial('planetMaterial');
    this.playerMaterial = game.physics.p2.createMaterial('playerMaterial');

    var playerPlanetMC = game.physics.p2.createContactMaterial(this.playerMaterial, this.planetMaterial, { friction: 1, frictionStiffness: 1e7, frictionRelaxation: 3 });
    console.log(playerPlanetMC);

    this.player = new Player({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
    });

    this.game.add.existing(this.player)
    game.camera.follow(this.player);

    const diameter = 2000;
    this.planet = new Planet({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY + diameter/2 + 32 + 5,
      diameter: diameter
    });
    this.game.add.existing(this.planet)

    this.worldgroup = this.game.add.group();
    this.worldgroup.add(this.starfield);
    this.worldgroup.add(this.player);
    this.worldgroup.add(this.planet);

    this.updateRotation();
    this.game.camera.x = this.player.x - this.camera.width / 2;
    this.game.camera.y = this.player.y - this.camera.height / 2;
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }

  updateRotation() {
    this.worldgroup.rotation = -1*this.player.rotation;
    this.worldgroup.pivot.x = this.player.x;
    this.worldgroup.pivot.y = this.player.y;
    this.worldgroup.x = this.worldgroup.pivot.x;
    this.worldgroup.y = this.worldgroup.pivot.y;
  }

  update() {
    this.player.accelerateToObject(this.planet);

    //this.updateRotation();
  }

  render () {
    if (__DEV__) {
      this.game.debug.cameraInfo(game.camera, 32, 32);
      //this.game.debug.spriteInfo(this.player, 32, 32)
      //this.game.debug.text("on ground? " + this.player.onGround(), 0, 10 );
    }
  }
}
