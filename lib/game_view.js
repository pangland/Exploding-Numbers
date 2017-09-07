class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.game.fillBottomRow();
    this.game.draw(this.ctx);
    // setInterval(() => {
    //   this.game.createNumber();
    //   this.game.draw(this.ctx);
    // }, 2000);
  }
}

module.exports = GameView;
// export default GameView;
