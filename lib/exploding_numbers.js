import Game from './game.js';
import GameView from './game_view.js';
import { sound } from '../sound.js';
// import soundplayer from 'sound-player';
// import player from 'play-sound';

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1000;
  canvas.height = 550;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 550);
  ctx.fillStyle = "white";
  ctx.font = "14pt Arial";
  ctx.fillText("s: Skips an equation, but remember that difficulty goes up with each skipped equation", 70, 100);
  ctx.fillText("p: pauses/unpauses the game and shows controls", 70, 120);
  ctx.fillText("r: resets the game", 70, 140);


  function handleStartAndEnd() {
    startGame();
  }

  canvas.addEventListener("click", handleStartAndEnd);

  function startGame() {
    debugger;
    const game = new Game();
    function handleClick() {
      game.handleClick(event, ctx);
    }

    canvas.removeEventListener('click', handleStartAndEnd);
    canvas.addEventListener("click", handleClick);

    document.addEventListener('keypress', (e) => {
      // debugger;
      switch (e.key) {
        case "s":
          game.newEquation();
          break;
        case "r":
          // canvas.removeEventListener('click', handleClick);
          // handleStartAndEnd();
          // canvas.removeEventListener('keypress', e);
          break;
      }
    });

    sound.playMusic();

    new GameView(game, ctx).start(() => {
      ctx.color = 'white';

      ctx.fillStyle = "black";
      ctx.fillRect(400, 0, 600, 50);
      ctx.fillStyle = "white";
      ctx.strokeStyle = "black";
      ctx.font = '17pt arial';

      if (game.won()) {
        ctx.fillText("Expression: Who's awesome?", 350, 20);
        ctx.fillText("Answer: You're awesome!", 350, 45);
        ctx.font = '50pt Arial';
        ctx.fillText('YOU SAVED MATH!', 170, 150);
        ctx.strokeText('YOU SAVED MATH!', 170, 150);
      } else {
        ctx.fillStyle = "black";
        ctx.fillRect(40, 100, 960, 150);
        ctx.fillStyle = "white";
        ctx.fillText('Expression: Did you just fail?', 350, 20);
        ctx.fillText("Answer: You did.", 350, 45);
        ctx.font = '50pt Arial';
        ctx.fillText('Your math needs work', 150, 150);
        ctx.strokeText('Your math needs work', 150, 150);
      }

      ctx.fillText('Click anywhere to play again!', 50, 225);
      ctx.strokeText('Click anywhere to play again!', 50, 225);

      canvas.removeEventListener('click', handleClick);
      canvas.addEventListener("click", handleStartAndEnd);
    });
  }

  const sketchpad = document.getElementById("sketchpad-canvas");
  sketchpad.width = 300;
  sketchpad.height = 550;

  const ctx2 = sketchpad.getContext("2d");
  ctx2.fillStyle = "gray";
  ctx2.fillRect(0, 0, 300, 550);
  ctx2.fillStyle = "blue";
  ctx2.font = "20pt Arial";
  ctx2.fillText("Sketchpad", 70, 50);

  sketchpad.addEventListener('mousedown', activatePencil);
  sketchpad.addEventListener('mousemove', movePencil);
  sketchpad.addEventListener('mouseup', deactivatePencil);
  sketchpad.addEventListener('mouseleave', deactivatePencil);

  let drawStuff = false;
  let start = null;

  function activatePencil() {
    drawStuff = true;
    draw();
  }

  function movePencil() {
    if (drawStuff) {
      draw();
    }
  }

  function deactivatePencil() {
    drawStuff = false;
    start = null;
  }

  function draw() {
    ctx2.lineWidth = 5;
    ctx2.strokeStyle = 'white';
    ctx2.beginPath();
    if (start) {
      ctx2.moveTo(start[0], start[1]);
    }

    ctx2.lineTo(event.offsetX, event.offsetY);
    ctx2.closePath();
    ctx2.stroke();
    start = [event.offsetX, event.offsetY];
  }

  document.getElementById("clear").addEventListener("click", clearSketchPad);

  function clearSketchPad() {
    ctx2.fillStyle = "gray";
    ctx2.fillRect(0, 0, 300, 550);
    ctx2.fillStyle = "blue";
    ctx2.font = "20pt Arial";
    ctx2.fillText("Sketchpad", 70, 50);
  }
});
