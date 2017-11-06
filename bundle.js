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



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.width = 1000;
  canvas.height = 550;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 1000, 550);
  ctx.fillStyle = "white";
  ctx.font = "50pt Arial";
  ctx.fillText("Click anywhere to start, player", 70, 100);

  function handleStartAndEnd() {
    startGame();
  }

  canvas.addEventListener("click", handleStartAndEnd);

  function startGame() {
    const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
    function handleClick() {
      game.handleClick(event, ctx);
    }

    canvas.removeEventListener('click', handleStartAndEnd);
    canvas.addEventListener("click", handleClick);

    new __WEBPACK_IMPORTED_MODULE_1__game_view_js__["a" /* default */](game, ctx).start(() => {
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
  sketchpad.width = 1000;
  sketchpad.height = 550;

  const ctx2 = sketchpad.getContext("2d");
  ctx2.fillStyle = "black";
  ctx2.fillRect(0, 0, 1000, 550);
  ctx2.fillStyle = "white";
  ctx2.font = "30pt Arial";
  ctx2.fillText("This is a sketchpad in development; disregard", 70, 100);

  sketchpad.addEventListener('mousedown', activatePencil);
  sketchpad.addEventListener('mousemove', movePencil);
  sketchpad.addEventListener('mouseup', deactivatePencil);
  sketchpad.addEventListener('mouseleave', deactivatePencil);

  let drawStuff = false;

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
  }

  function draw() {
    // ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
    // debugger
    ctx2.beginPath();
    ctx2.arc(event.offsetX, event.offsetY, 5, 0, 2 * Math.PI, false);
    ctx2.fillStyle = 'red';
    ctx2.fill();
    // ctx2.fillText("Expression: Who's awesome?", event.offsetX, event.offsetY);
    // ctx2.fillText("Answer: You're awesome!", 350, 45);
  }
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__number_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__equations_js__ = __webpack_require__(3);



class Game {
  constructor() {
    this.allNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.fallingNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.staticNumberBlocks = [[], [], [], [], [], [], [], [], [], []];

    this.horPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    this.blocksPerColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.selectedNumbers = [];

    this.selectedNumbers = [];
    this.equations = new __WEBPACK_IMPORTED_MODULE_1__equations_js__["a" /* default */]();
    this.generatedNumberCount = 0;
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
    for (let i = 0; i < this.blocksPerColumn.length; i++) {
      if (!truthiness) break;
      if (this.blocksPerColumn[i] < 5) {
        truthiness = false;
      }
    }

    return truthiness;
  }

  fillBottomRow() {
    const vertPosition = 450;
    this.horPositions.forEach((pos, idx) => {
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
    this.generatedNumberCount += 1;
    this.fallingNumberBlocks[randomColumn / 100].push(newNumber);
    this.allNumberBlocks[randomColumn / 100].push(newNumber);
  }

  incrementBlocksPerColumn(columnNumber) {
    this.blocksPerColumn[columnNumber] = this.blocksPerColumn[columnNumber] + 1;
  }

  decrementBlocksPerColumn(columnNumber) {
    this.blocksPerColumn[columnNumber] -= 1;
  }

  randomStartingPos() {
    const filteredPositions = [];
    this.horPositions.forEach((column, idx) => {
      if (!this.fallingNumberBlocks[idx][0] && this.blocksPerColumn[idx] < 5) {
        filteredPositions.push(this.horPositions[idx]);
      } else if (this.blocksPerColumn[idx] < 5 && this.fallingNumberBlocks[idx].slice(-1)[0].pos[1] >= 150) {
        filteredPositions.push(this.horPositions[idx]);
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

    ctx.font = '17pt Arial';
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 1000, 550);
    ctx.fillStyle = "white";
    ctx.fillText("Answer: " + numbers.join(''), 400, 45);

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
    console.log(allNumbers);
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const colors = ["pink", "red", "blue", "lightblue", "teal", "yellow", "green"];
const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

class Number {
  constructor(pos) {
    this.pos = pos;
    this.vel = this.randomVel();
    this.color = this.randomColor();
    this.selected = false;

    this.number = Math.floor(Math.random() * 10);
  }

  draw(ctx) {
    ctx.fillStyle = this.selected ? "gray" : this.color;
    ctx.font = '17pt Arial';

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

    return randomBase * 2;
  }

  randomColor() {
    return colors[Math.floor(Math.random() * 10) % colors.length];
  }

  checkCollision(otherNum) {
    if (typeof otherNum === "undefined") {
      return this.pos[1] + this.vel + 100 > 550;
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
    ctx.fillText('Expression: ' + this.equation, 400, 20);
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
    if (solution > 0) factors.push(1);
    for (let i = 2; i <= solution / 2; i++) {
      if (solution % i === 0) {
        factors.push(i);
      }
    }

    if (solution === 0) {
      const firstValue = Math.floor(Math.random() * 3 * this.equationCount);
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
      .floor(Math.random() * this.equationCount + 1));
    const secondValue = firstValue === 0 ? 1 : firstValue / solution;
    this.equation = `${firstValue} / ${secondValue}`;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Equations);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
  }

  start(callback) {
    let timer = 4000;
    let timeBetweenBlocks = 0;
    this.game.fillBottomRow();
    this.game.draw(this.ctx);

    // const gameInterval = setInterval(() => {
    //   this.game.move();
    //   this.game.createNumber();
    //   this.game.draw(this.ctx);
    // }, 4000);

    const gameInterval = setInterval(() => {
      if (timer <= timeBetweenBlocks) {
        this.game.move();
        this.game.createNumber();
        this.game.draw(this.ctx);
        const power = this.game.generatedNumberCount * -.05;
        timer = 1000 + Math.random() * 2000 + 2000 * Math.pow(Math.E, power);
        timeBetweenBlocks = 0;
        console.log(timer);
      } else {
        timeBetweenBlocks += 100;
      }
    }, 100);

    // const gameTwoInterval = () => {
    //   setTimeout(() => {
    //     this.game.move();
    //     this.game.createNumber();
    //     this.game.draw(this.ctx);
    //   }, 4000);
    //
    //   if (!this.game.won() && !this.game.over()) {
    //     gameTwoInterval();
    //   }
    // };

    const moveInterval = setInterval(() => {
      this.game.move();
      this.game.draw(this.ctx);
      if (this.game.won() || this.game.over()) {
        clearInterval(gameInterval);
        clearInterval(moveInterval);
        callback();
      }
    }, 10);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map