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

    // setInterval(() => {
    //   this.game.createNumber();
    //   this.game.draw(this.ctx);
    // }, 2000);
    const moveInterval = setInterval(() => {
      this.game.move();
      this.game.draw(this.ctx);
      if (this.game.won() || this.game.over()) {
        debugger
        clearInterval(gameInterval);
        clearInterval(moveInterval);
        callback();
      }
    }, 10);
  }
}

module.exports = GameView;
// export default GameView;
