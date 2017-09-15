/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__game_view_js__);
// const Game = require("./game");
// const GameView = require("./game_view");



document.write("It breathes");
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1000;
  canvas.height = 550;

  const ctx = canvas.getContext("2d");
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 550);
  new __WEBPACK_IMPORTED_MODULE_1__game_view_js___default.a(game, ctx).start();

  canvas.addEventListener("click", (e) => {
    game.handleClick(e, ctx);
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__equations_js__ = __webpack_require__(3);



const horPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const blocksPerColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const selectedNumbers = [];

class Game {
  constructor() {
    this.allNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.fallingNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.staticNumberBlocks = [[], [], [], [], [], [], [], [], [], []];


    this.selectedNumbers = [];
    this.equations = new __WEBPACK_IMPORTED_MODULE_1__equations_js__["a" /* default */]();
  }

  won() {
    this.staticNumberBlocks.forEach((column) => {
      if (column.length !== 0) {
        return false;
      }
    });
    return true;
  }

  over() {
    blocksPerColumn.forEach((count) => {
      if (count < 5) {
        return false;
      }
    });
    return true;
  }

  fillBottomRow() {
    const vertPosition = 450;
    horPositions.forEach((pos, idx) => {
      const newNumber = new __WEBPACK_IMPORTED_MODULE_0__number_js__["a" /* default */]([pos, vertPosition]);
      this.allNumberBlocks[idx].push(newNumber);
      this.staticNumberBlocks[idx].push(newNumber);
      this.incrementBlocksPerColumn(idx);
    });

    this.newEquation();
  }

  createNumber() {
    const randomColumn = this.randomStartingPos();
    this.incrementBlocksPerColumn(Math.round(randomColumn / 100));
    const newNumber = new __WEBPACK_IMPORTED_MODULE_0__number_js__["a" /* default */]([randomColumn, 50]);
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
        debugger
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
    })

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
            if (column.indexOf(number) !== -1) {
              this.selectedNumbers.splice(jdx, 1);
              this.handleFallingDeletion(idx, jdx);
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

/* harmony default export */ __webpack_exports__["a"] = (Game);
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import MovingObject from './moving_object.js';

const colors = ["pink", "red", "blue", "lightblue", "darkblue"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 'extends MovingObject' for if we end up using it
class Number {
  constructor(pos) {
    this.pos = pos;
    this.vel = this.randomVel();
    this.color = this.randomColor();
    this.selected = false;

    this.number = Math.floor(Math.random() * 10);
  }

  draw(ctx) {
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.pos[0], this.pos[1] - this.vel * 10, 100, 100);
    ctx.fillStyle = this.selected ? "gray" : this.color;
    ctx.font = '18pt Arial';

    // ctx.fillRect(this.pos[0], this.pos[1], 100, 100);
    // ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(this.pos[0] + 10, this.pos[1]);
    ctx.lineTo(this.pos[0] + 90, this.pos[1]);
    ctx.quadraticCurveTo(this.pos[0] + 100, this.pos[1], this.pos[0] + 100, this.pos[1] + 10);
    ctx.lineTo(this.pos[0] + 100, this.pos[1] + 90);
    ctx.quadraticCurveTo(this.pos[0] + 100, this.pos[1] + 100, this.pos[0] + 90, this.pos[1] + 100);
    ctx.lineTo(this.pos[0] + 10, this.pos[1] + 100);
    ctx.quadraticCurveTo(this.pos[0], this.pos[1] + 100, this.pos[0], this.pos[1] + 90);
    ctx.lineTo(this.pos[0], this.pos[1] + 10);
    ctx.quadraticCurveTo(this.pos[0], this.pos[1], this.pos[0] + 10, this.pos[1]);
    ctx.stroke();
    ctx.fill();

    ctx.fillStyle = "black";
    ctx.fillText(this.number, this.pos[0] + 43, this.pos[1] + 60);
  }

  move() {
    this.pos[1] = this.pos[1] + this.vel;
  }

  randomVel() {
    let randomBase = Math.random();
    randomBase = randomBase < .1 ? .1 : randomBase;

    return randomBase / 2;
  }

  randomColor() {
    return colors[Math.floor(Math.random() * 10) % colors.length];
  }

  checkCollision(otherNum) {
    if (typeof otherNum === "undefined") {
      return this.pos[1] + this.vel + 100 > 550
    } else {
      return this.pos[1] + this.vel + 100 > otherNum.pos[1];
    }
  }

  syncPosition(height) {
    this.pos[1] = height;
  }

  isClicked(mouseX, mouseY) {
    const pos = this.pos;
    const verticalMatch = mouseY >= pos[1] && mouseY < pos[1] + 100;
    const horizontalMatch = mouseX >= pos[0] && mouseX < pos[0] + 100;
    return verticalMatch && horizontalMatch;
  }

  downshift() {
    this.pos[1] = this.pos[1] + 100;
  }

  toggleColor() {
    this.selected = this.selected ? false : true;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Number);
// module.exports = Number;



// Spacerock. It inherits from MovingObject.




// const MovingObject = require("./moving_object.js");
// const Util = require("./utils.js");
//
//
//
// Util.inherits(Asteroid, MovingObject);
//
// function Asteroid(pos) {
//   const COLOR = "pink";
//   const RADIUS = 4;
//
//   const astProperties = {
//     pos: pos,
//     vel: randomVec(5),
//     color: COLOR,
//     radius: RADIUS
//   };
//
//   MovingObject.call(this, astProperties);
// }
//
// const randomVec = function (length) {
//   const deg = 2 * Math.PI * Math.random();
//   return Util.scale([Math.sin(deg), Math.cos(deg)], length);
// };
//
// module.exports = Asteroid;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Equations {
  constructor() {
    this.equationCount = 0;
    this.operations = ['+', '-', '*', '/'];
    this.equation = "";
  }

  draw(ctx) {
    ctx.fillStyle = "white";
    ctx.fillText(this.equation, 450, 25);
  }

  generateNewEquation(numberArray) {
    this.equationCount++;
    let solution;

    if (numberArray.length > 1) {
      solution = parseInt(numberArray.join(''));
    } else {
      solution = numberArray[0];
    }

    const operation = this.operations[Math.floor(Math.random() * 4)];
    switch (operation) {
      case '+':
        this.add(solution);
        break;
      case '-':
        this.subtract(solution);
        break;
      case '*':
        this.multiply(solution);
        break;
      case '/':
        this.divide(solution);
        break;
    }
  }

  add(solution) {
    const firstValue = Math.floor(Math.random() * solution);
    const secondValue = solution - firstValue;
    this.equation = `${firstValue} + ${secondValue}`;
  }

  subtract(solution) {
    const firstValue = Math.floor(Math.random() * 5 * this.equationCount + solution);
    const secondValue = firstValue - solution;
    this.equation = `${firstValue} - ${secondValue}`;
  }

  multiply(solution) {
    const factors = [];
    for (let i = 1; i <= solution / 2; i++) {
      if (solution % i === 0) {
        factors.push(i);
      }
    }

    if (solution === 0) {
      const firstValue = factors[Math.floor(Math.random() * 3 * this.equationCount)];
      const secondValue = 0;
      this.equation = `${firstValue} * ${secondValue}`;
    } else {
      const firstValue = factors[Math.floor(Math.random() * factors.length)];
      const secondValue = solution / firstValue;
      this.equation = `${firstValue} * ${secondValue}`;
    }
  }

  divide(solution) {
    const firstValue = solution * (Math
      .floor(Math.random() * 3 * this.equationCount + 1));
    const secondValue = firstValue / solution;
    this.equation = `${firstValue} / ${secondValue}`;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Equations);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
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
    setInterval(() => {
      this.game.move();
      this.game.draw(this.ctx);
      // if (this.game.won() || this.game.over()) {
      //   debugger
      //   clearInterval(gameInterval);
      // }
    }, 10);
  }
}

module.exports = GameView;
// export default GameView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map