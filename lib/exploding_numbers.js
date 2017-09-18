// const Game = require("./game");
// const GameView = require("./game_view");
import Game from './game.js';
import GameView from './game_view.js';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1000;
  canvas.height = 550;

  const ctx = canvas.getContext("2d");
  // const game = new Game();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 550);
  ctx.fillStyle = "white";
  ctx.font = "50pt Arial";
  ctx.fillText("Click anywhere to start, loser", 70, 100);
  // ctx.

  function handleStartAndEnd() {
    startGame();
  }

  // function handleClick() {
  //   game.handleClick(event, ctx);
  // }

  // canvas.addEventListener("click", (e) => {
  //   game.handleClick(e, ctx);
  // });

  canvas.addEventListener("click", handleStartAndEnd);

  function startGame() {
    const game = new Game();
    function handleClick() {
      game.handleClick(event, ctx);
    }

    canvas.removeEventListener('click', handleStartAndEnd);
    canvas.addEventListener("click", handleClick);

    new GameView(game, ctx).start(() => {
      ctx.color = 'white';

      ctx.fillStyle = "black";
      ctx.fillRect(400, 0, 600, 50);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.font = '17pt arial';

      if (game.won()) {
        ctx.fillText("Expression: Who's awesome?", 400, 20);
        ctx.fillText("Answer: You're awesome!", 400, 45);
        ctx.font = '50pt Arial';
        ctx.fillText('YOU SAVED MATH!', 170, 150);
        ctx.strokeText('YOU SAVED MATH!', 170, 150);
      } else {
        ctx.fillText('Expression: Did you just fail?', 400, 20);
        ctx.fillText("Answer: You did.", 400, 45);
        ctx.font = '50pt Arial';
        ctx.fillText('Your math needs work', 150, 150);
        ctx.strokeText('Your math needs work', 150, 150);
      }
      // ctx.stroke();
      ctx.fillText('Click anywhere to play again!', 50, 225);
      ctx.strokeText('Click anywhere to play again!', 50, 225);

      canvas.removeEventListener('click', handleClick);
      canvas.addEventListener("click", handleStartAndEnd)
    });
  }


  // canvas.addEventListener("click", handleClick);
  //
  // new GameView(game, ctx).start(() => {
  //   ctx.font = '50pt Arial';
  //   ctx.color = 'white';
  //   if (game.won()) {
  //     ctx.fillText('YOU SAVED MATH!', 50, 150);
  //   } else {
  //     ctx.fillText('Your math is worse than my coding', 100, 150);
  //   }
  //   canvas.removeEventListener('click', handleClick);
  // });

  // canvas.addEventListener("onMouseDown", (e) => {
  //   game.handleHoldDown(e,)
  // });
});
