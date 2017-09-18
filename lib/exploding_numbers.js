// const Game = require("./game");
// const GameView = require("./game_view");
import Game from './game.js';
import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1000;
  canvas.height = 550;

  const ctx = canvas.getContext("2d");
  const game = new Game();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 550);

  function handleClick() {
    game.handleClick(event, ctx);
  }

  // canvas.addEventListener("click", (e) => {
  //   game.handleClick(e, ctx);
  // });

  canvas.addEventListener("click", handleClick);

  new GameView(game, ctx).start(() => {
    // canvas.removeEventListener();
    // const won = game.won();
    // won ? console.log('whoopio kaya badoobaaa') : console.log("whoops");
    ctx.font = '50pt Arial';
    ctx.color = 'white';
    if (game.won()) {
      ctx.fillText('YOU SAVED MATH!', 50, 150);
    } else {
      ctx.fillText('Your math is worse than my coding', 100, 150);
    }

    // canvas.parentNode.replaceChild(canClone, canvas);

    // clone = canvas.cloneNode(true);
    // canvas.parentNode.replaceChild(clone, canvas);
    canvas.removeEventListener('click', handleClick);
  });

  // canvas.addEventListener("onMouseDown", (e) => {
  //   game.handleHoldDown(e,)
  // });
});
