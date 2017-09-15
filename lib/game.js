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


    this.selectedNumbers = [];
    this.equations = new Equations();
  }

  won() {
    let truthiness = true;
    for (let i = 0; i < this.staticNumberBlocks.length; i++) {
      if (!truthiness) break;
      if (this.staticNumberBlocks[i].length !== 0) {
        truthiness = false;
      }
    }

    return truthiness;
  }

  over() {
    let truthiness = true;
    for (let i = 0; i < blocksPerColumn.length; i++) {
      if (!truthiness) break;
      if (blocksPerColumn[i] < 5) {
        truthiness = false;
      }
    }

    return truthiness;
  }

  fillBottomRow() {
    const vertPosition = 450;
    horPositions.forEach((pos, idx) => {
      const newNumber = new Number([pos, vertPosition]);
      this.allNumberBlocks[idx].push(newNumber);
      this.staticNumberBlocks[idx].push(newNumber);
      this.incrementBlocksPerColumn(idx);
    });

    this.newEquation();
  }

  createNumber() {
    const randomColumn = this.randomStartingPos();
    this.incrementBlocksPerColumn(Math.round(randomColumn / 100));
    const newNumber = new Number([randomColumn, 50]);
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
    const numbers = this.selectedNumbers.map((num) => num.number);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1000, 550);
    ctx.fillStyle = "white";
    ctx.fillText(numbers.join(' '), 750, 25);
    this.allNumberBlocks.forEach((numberColumn) => {
      numberColumn.forEach((number) => number.draw(ctx));
    });
    this.equations.draw(ctx);
  }

  handleClick(e, ctx) {
    this.allNumberBlocks.forEach((columns) => {
      columns.forEach((number) => {
        if (number.isClicked(e.offsetX, e.offsetY)) {
          this.handleNumber(number);
          this.correctMatch();
          this.draw(ctx);
        }
      });
    });
  }

  // Number {pos: Array(2), vel: 0.8010193312934939, color: "blue", selected: false, number: 9}
  // Number {pos: Array(2), vel: 0.8010193312934939, color: "blue", selected: true, number: 9}
  // Number {pos: Array(2), vel: 0.8010193312934939, color: "blue", selected: true, number: 9}


  handleNumber(number) {
    number.toggleColor();
    const indexOfNumber = this.selectedNumbers.indexOf(number);
    // debugger

    if (indexOfNumber === -1) {
      this.selectedNumbers.push(number);
    } else {
      this.selectedNumbers.splice(indexOfNumber, 1);
    }
  }

  correctMatch() {
    // debugger
    let numberProperty = this.selectedNumbers.map((number) => {
      return number.number;
    });


    if (numberProperty.join('') === this.equationSolution.join('')) {
      this.removeNumbers();
      this.newEquation();
    }
  }

  removeNumbers() {
    this.staticNumberBlocks.forEach((column, idx) => {
      let i = 0;
      while (i < column.length) {
        let selectedCount = this.selectedNumbers.length;
        this.selectedNumbers.forEach((number, jdx) => {
          const relevantIndex = this.staticNumberBlocks[idx].indexOf(number);
          if (relevantIndex !== -1) {
            this.selectedNumbers.splice(jdx, 1);
            this.handleStaticDeletion(idx, relevantIndex);
            this.decrementBlocksPerColumn(idx);
          }
        });
        if (selectedCount === this.selectedNumbers.length) {
          i++;
        }
      }
    });


    if (this.selectedNumbers.length > 0) {
      this.fallingNumberBlocks.forEach((column, idx) => {
        let i = 0;
        while (i < column.length) {
          let selectedCount = this.selectedNumbers.length;
          this.selectedNumbers.forEach((number, jdx) => {
            const relevantIndex = this.fallingNumberBlocks[idx].indexOf(number);
            if (relevantIndex !== -1) {
              this.selectedNumbers.splice(jdx, 1);
              this.handleFallingDeletion(idx, relevantIndex);
              this.decrementBlocksPerColumn(idx);
            }
          });
          if (selectedCount === this.selectedNumbers.length) {
            i++;
          }
        }
      });
    }
    this.selectedNumbers = [];
  }

  handleStaticDeletion(outerIndex, innerIndex) {
    this.staticNumberBlocks[outerIndex].splice(innerIndex, 1);
    this.allNumberBlocks[outerIndex].splice(innerIndex, 1);

    for (let i = innerIndex; i < this.staticNumberBlocks[outerIndex].length; i++) {
      this.staticNumberBlocks[outerIndex][i].downshift();
    }
  }

  handleFallingDeletion(outerIndex, innerIndex) {
    this.fallingNumberBlocks[outerIndex].splice(innerIndex, 1);

    const staticsInRow = this.staticNumberBlocks[outerIndex].length;

    this.allNumberBlocks[outerIndex].splice(innerIndex + staticsInRow, 1);
  }

  newEquation() {
    let allNumbers = [].concat.apply([], this.allNumberBlocks);
    allNumbers = allNumbers.sort(() => Math.random());
    const numbersToGrab = Math.floor(Math.random() * allNumbers.length % 3) + 1;

    let equationSolution = allNumbers.slice(0, numbersToGrab);
    equationSolution = equationSolution.map((number) => {
      return number.number;
    });

    while (equationSolution[0] === 0 && equationSolution.length > 1) {
      equationSolution = equationSolution.slice(1);
    }
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
