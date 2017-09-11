import Number from './number.js';
import Equations from './equations.js';

const horPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const blocksPerColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const selectedNumbers = [];

class Game {
  constructor() {
    this.allNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.fallingNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.staticNumberBlocks = [[], [], [], [], [], [], [], [], [], []];

    this.equations = new Equations();
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
    this.incrementBlocksPerColumn(Math.round(randomColumn / 100));
    const newNumber = new Number([randomColumn, 50]);
    // debugger
    this.fallingNumberBlocks[randomColumn / 100].push(newNumber);
    this.allNumberBlocks[randomColumn / 100].push(newNumber);
  }

  incrementBlocksPerColumn(columnNumber) {
    blocksPerColumn[columnNumber] = blocksPerColumn[columnNumber] + 1;
  }

  decrementBlocksPerColumn(columnNumber) {
    blocksPerColumn[columnNumber] -= 1;
  }

  randomStartingPos() {
    const filteredPositions = [];
    horPositions.forEach((column, idx) => {
      if (!this.fallingNumberBlocks[idx][0] && blocksPerColumn[idx] < 5) {
        filteredPositions.push(horPositions[idx]);
      } else if (blocksPerColumn[idx] < 5 && this.fallingNumberBlocks[idx].slice(-1)[0].pos[1] >= 150) {
        filteredPositions.push(horPositions[idx]);
      }
    });
    return filteredPositions[Math.floor(Math.random() * 10) % filteredPositions.length];
  }

  move() {
    this.fallingNumberBlocks.forEach((column, idx) => {
      while (column[0] && column[0]
        .checkCollision(this.staticNumberBlocks[idx].slice(-1)[0])) {
        column[0].syncPosition(450 - 100 * this.staticNumberBlocks[idx].length);
        this.staticNumberBlocks[idx].push(column.shift());
      }

      if (column[0]) column[0].move();
      column.slice(1).forEach((number, jdx) => {
        if (!number.checkCollision(this.fallingNumberBlocks[idx][jdx])) {
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

  handleClick(e, ctx) {
    this.allNumberBlocks.forEach((columns) => {
      columns.forEach((number) => {
        if (number.isClicked(e.pageX, e.pageY)) {
          this.handleNumber(number);
          this.correctMatch();
        }
      });
    });
  }

  handleNumber(number) {
    number.toggleColor();
    const indexOfNumber = this.selectedNumbers.indexOf(number);

    if (indexOfNumber === -1) {
      this.selectedNumbers.push(number);
    } else {
      this.selectedNumbers.splice(indexOfNumber, 1);
    }
  }

  correctMatch() {
    if (this.selectedNumbers.join(',') === this.equationSolution) {
      this.removeNumbers();
    }
  }

  removeNumbers() {
    this.allNumbers.forEach((column) => {

    });
  }

  newEquation() {
    const allNumbers = [].concat.apply([], this.allNumberBlocks.number);
    allNumbers = allNumbers.sort(() => Math.random());
    const numbersToGrab = Math.floor(Math.random() * allNumbers.length % 3);
    const equationSolution = allNumbers.slice(0, numbersToGrab);
    this.equationSolution = equationSolution;
    this.equations.generateNewEquation(equationSolution);
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
