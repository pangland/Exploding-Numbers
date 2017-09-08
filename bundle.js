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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view_js__ = __webpack_require__(2);
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

  document.addEventListener("click", () => {
    game.handleClick();
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number_js__ = __webpack_require__(3);


const horPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const blocksPerColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

class Game {
  constructor() {
    this.allNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.fallingNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.staticNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
  }

  fillBottomRow() {
    const vertPosition = 450;
    horPositions.forEach((pos, idx) => {
      this.allNumberBlocks[idx].push(new __WEBPACK_IMPORTED_MODULE_0__number_js__["a" /* default */]([pos, vertPosition]));
      this.staticNumberBlocks[idx].push(new __WEBPACK_IMPORTED_MODULE_0__number_js__["a" /* default */]([pos, vertPosition]));
      this.incrementBlocksPerColumn(idx);
    });
  }

  createNumber() {
    const randomColumn = this.randomStartingPos();
    this.incrementBlocksPerColumn(Math.round(randomColumn / 100));
    const newNumber = new __WEBPACK_IMPORTED_MODULE_0__number_js__["a" /* default */]([randomColumn, 50]);
    // debugger
    this.fallingNumberBlocks[randomColumn / 100].push(newNumber);
    this.allNumberBlocks[randomColumn / 100].push(newNumber);
    console.log(blocksPerColumn);
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
    // return horPositions[Math.floor(Math.random() * 10)];
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
        // if (!number.checkCollision(this.staticNumberBlocks[idx].slice(-1)[0])) {
        //   number.move();
        // }
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

  handleClick(ctx) {
    this.allNumberBlocks.forEach((columns) => {
      columns.forEach((number) => {
        if (number.isClicked(event.screenX, event.screenY)) {
          console.log(number.number);
        }
      });
    });
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
/***/ (function(module, exports) {

class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start() {
    this.game.fillBottomRow();
    this.game.draw(this.ctx);

    setInterval(() => {
      this.game.move();
      this.game.createNumber();
      this.game.draw(this.ctx);
    }, 2000);

    setInterval(() => {
      this.game.move();
      this.game.draw(this.ctx);
    }, 10)
    // setInterval(() => {
    //   this.game.createNumber();
    //   this.game.draw(this.ctx);
    // }, 2000);
  }
}

module.exports = GameView;
// export default GameView;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// import MovingObject from './moving_object.js';

const colors = ["pink", "red", "blue", "lightblue", "darkblue"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// 'extends MovingObject' for if we end up using it
class Number {
  constructor(pos) {
    this.pos = pos;
    this.vel = this.randomVec(5);
    this.color = this.randomColor();

    this.number = Math.floor(Math.random() * 10);
  }

  draw(ctx) {
    // ctx.fillStyle = "black";
    // ctx.fillRect(this.pos[0], this.pos[1] - this.vel * 10, 100, 100);
    ctx.fillStyle = this.color;
    ctx.font = '18pt Arial';
    ctx.fillRect(this.pos[0], this.pos[1], 100, 100);
    ctx.fillStyle = "black";
    ctx.fillText(this.number, this.pos[0] + 43, this.pos[1] + 60);
  }

  move() {
    this.pos[1] = this.pos[1] + this.vel;
  }

  randomVec(length) {
    return Math.random();
  }

  randomColor() {
    return colors[Math.floor(Math.random() * 10) % colors.length];
  }

  checkCollision(otherNum) {
    return this.pos[1] + this.vel + 100 > otherNum.pos[1];
  }

  syncPosition(height) {
    this.pos[1] = height;
  }

  isClicked(mouseX, mouseY) {
    const pos = this.pos;
    const verticalMatch = mouseY >= pos[1] && mouseY < pos[1] + 100;
    const horizontalMatch = mouseX >= pos[0] && mouseY < pos[0] + 100;
    debugger
    return verticalMatch && horizontalMatch;
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map