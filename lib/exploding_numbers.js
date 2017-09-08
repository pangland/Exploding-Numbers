// const Game = require("./game");
// const GameView = require("./game_view");
import Game from './game.js';
import GameView from './game_view.js';

document.write("It breathes");
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1000;
  canvas.height = 550;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 550);
  new GameView(game, ctx).start();

  document.addEventListener("click", () => {
    game.handleClick();
  });
});
