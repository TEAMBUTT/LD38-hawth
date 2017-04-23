import { filter } from 'lodash';

export default class extends Phaser.Text {
  constructor ({game, x, y, birds}) {
    super(game, x, y, "sadf");
    console.log(this.game)

    this.birds = birds;

    this.font = 'Engagement'
    this.padding.set(10, 16)
    this.fontSize = 60
    this.fill = '#333333'
    this.smoothed = true
    this.text = `2/10`

    this.fixedToCamera = true;

    console.log(this.birds)
  }

  update() {
    const total = this.birds.total;
    const following  = filter(this.birds.children, (bird) => bird.state === "followPlayer").length;
    this.text = `${following}/${total}`;
  }
}
