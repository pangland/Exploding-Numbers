class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start(callback) {
    this.game.fillBottomRow();
    this.game.draw(this.ctx);

    const gameInterval = setInterval(() => {
      this.game.move();
      this.game.createNumber();
      this.game.draw(this.ctx);
    }, 4000);

    // const gameTwoInterval = () => {
    //   const count = this.game.equations.equationCount;
    //   const timer = 2 + 2 * Math.pow(Math.E, -.05 * count);
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
