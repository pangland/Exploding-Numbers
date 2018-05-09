class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start(callback) {
    let timer = 4000;
    let timeBetweenBlocks = 0;
    this.game.fillBottomRow();
    this.game.draw(this.ctx);

    // const gameInterval = setInterval(() => {
    //   this.game.move();
    //   this.game.createNumber();
    //   this.game.draw(this.ctx);
    // }, 4000);

    const gameInterval = setInterval(() => {
      if (timer <= timeBetweenBlocks) {
        this.game.move();
        this.game.createNumber();
        this.game.draw(this.ctx);
        const power = this.game.generatedNumberCount * -.05;
        timer = 1000 + Math.random() * 2000 + 2000 * Math.pow(Math.E, power);
        timeBetweenBlocks = 0;
      } else {
        timeBetweenBlocks += 100;
      }
    }, 100);

    // const gameTwoInterval = () => {
    //   setTimeout(() => {
    //     this.game.move();
    //     this.game.createNumber();
    //     this.game.draw(this.ctx);
    //   }, 4000);
    //
    //   if (!this.game.won() && !this.game.over()) {
    //     gameTwoInterval();
    //   }
    // };

    const moveInterval = setInterval(() => {
      this.game.move();
      this.game.draw(this.ctx);
      if (this.game.won() || this.game.over()) {
        clearInterval(gameInterval);
        clearInterval(moveInterval);
        callback();
      }
    }, 10);
  }
}

export default GameView;
