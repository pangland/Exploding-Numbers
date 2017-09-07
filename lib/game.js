import Number from './number.js';

const horPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const blocksPerColumn = Array(10).fill(0);

class Game {
  constructor() {
    this.allNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.fallingNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.staticNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
  }

  fillBottomRow() {
    const vertPosition = 450;
    horPositions.forEach((pos, idx) => {
      this.allNumberBlocks[idx].push(new Number([pos, vertPosition]));
      this.staticNumberBlocks[idx].push(new Number([pos, vertPosition]));
      this.incrementBlocksPerColumn(idx);
    });
  }

  createNumber() {
    const randomColumn = this.randomStartingPos();
    this.incrementBlocksPerColumn(randomColumn);
    const newNumber = new Number([randomColumn, 50]);
    debugger
    this.fallingNumberBlocks[randomColumn / 100].push(newNumber);
    this.allNumberBlocks[randomColumn / 100].push(newNumber);
  }

  incrementBlocksPerColumn(columnNumber) {
    blocksPerColumn[columnNumber] += 1;
  }

  decrementBlocksPerColumn(columnNumber) {
    blocksPerColumn[columnNumber] -= 1;
  }

  randomStartingPos() {
    return horPositions[Math.floor(Math.random() * 10)];
  }

  move() {
    this.fallingNumberBlocks.forEach((column, idx) => {
      while (column[0] && column[0]
        .checkCollision(this.staticNumberBlocks[idx].slice(-1)[0])) {
        debugger
        column[0].syncPosition(450 - 100 * this.staticNumberBlocks[idx].length);
        this.staticNumberBlocks[idx].push(column.shift());
      }

      column.forEach((number) => {
        if (!number.checkCollision(this.staticNumberBlocks[idx].slice(-1)[0])) {
          number.move();
        }
      });
    });
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1000, 500);
    this.allNumberBlocks.forEach((numberColumn) => {
      numberColumn.forEach((number) => number.draw(ctx));
    });
  }
}

export default Game;
// module.exports = Game;

// const Asteroid = require("./asteroid.js");
// // const Bullet = require("./bullet.js");
// // const Ship = require("./ship.js");
//
// function Game () {
//   const DIM_X = 500;
//   const DIM_Y = 500;
//   const NUM_ASTEROIDS = 30;
//
//   this.asteroids = this.addAsteroids(NUM_ASTEROIDS, DIM_X, DIM_Y);
// }
//
// Game.prototype.addAsteroids = function (count, dimX, dimY) {
//   const asteroids = [];
//
//   for (let i = 0; i < count; i++) {
//     asteroids.push(new Asteroid(this.randomPosition(dimX, dimY)));
//   }
//
//   return asteroids;
// };
//
// Game.prototype.randomPosition = function (dimX, dimY) {
//   let randX = Math.random() * dimX;
//   let randY = Math.random() * dimY;
//   return [randX, randY];
// };
//
// Game.prototype.draw = function (ctx) {
//   ctx.clearRect(0,0,500,500);
//   this.asteroids.forEach(function (el) {
//     el.draw(ctx);
//   });
// };
//
// Game.prototype.move = function () {
//   this.asteroids.forEach(function (el) {
//     el.move();
//   });
// };
//
// module.exports = Game;
