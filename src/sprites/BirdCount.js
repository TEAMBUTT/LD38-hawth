import { filter } from 'lodash';

export default class extends Phaser.Text {
  constructor ({game, x, y, birds}) {
    super(game, x, y, "sadf");

    this.birds = birds;

    this.font = 'Engagement'
    this.padding.set(10, 16)
    this.fontSize = 60
    this.fill = '#333333'
    this.smoothed = true
    this.text = `2/10`

    this.fixedToCamera = true;
  }

  following() {
    return filter(this.birds.children, (bird) => bird.state === "followPlayer").length;
  }

  total() {
    return this.birds.total;
  }

  update() {
    this.text = `${this.following()}/${this.total()}`;
  }
}
