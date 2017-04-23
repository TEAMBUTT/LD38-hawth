import Phaser from 'phaser'
import Mushroom from '../sprites/Mushroom'
import Player from '../sprites/Player'
import Planet from '../sprites/Planet'
import Bird from '../sprites/Bird'
import BirdCount from '../sprites/BirdCount'

export default class extends Phaser.State {
  init() {
  }
  preload() {}

  create() {
    game.world.resize(5000, 5000);

    this.starfield = game.add.tileSprite(0, 0, game.camera.width, game.camera.height, 'starfield');
    this.starfield.fixedToCamera = true;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    this.birds = this.game.add.group();

    this.planets = this.game.add.group();
    this.game.planets = this.planets;

    this.loadLevel();

    this.birdCount = new BirdCount({
      game: this.game,
      x: 0,
      y: 0,
      birds: this.birds
    });
    this.game.add.existing(this.birdCount);

    this.game.camera.x = this.player.x - this.camera.width / 2;
    this.game.camera.y = this.player.y - this.camera.height / 2;
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
  }

  loadLevel() {}

  addPlanet(x, y, diameter) {
    let planet = new Planet({
      game: this,
      x: x,
      y: y,
      diameter: diameter
    });
    this.add.existing(planet)
    this.planets.add(planet)
  }

  placePlayer(x, y) {
    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
    });
    this.game.add.existing(this.player)
    this.game.player = this.player;
  }

  placeBird(x, y) {
    let bird = new Bird({
      game: this.game,
      x: x,
      y: y
    });
    this.add.existing(bird);
    this.birds.add(bird);
  }

  update() {
    const parallax = 16
    this.starfield.tilePosition.x = -this.player.x/parallax
    this.starfield.tilePosition.y = -this.player.y/parallax
  }
};
