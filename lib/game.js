import Number from './number.js';
import Equations from './equations.js';

class Game {
  constructor() {
    this.allNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.fallingNumberBlocks = [[], [], [], [], [], [], [], [], [], []];
    this.staticNumberBlocks = [[], [], [], [], [], [], [], [], [], []];

    this.horPositions = [0, 100, 200, 300, 400, 500, 600, 700, 800, 900];
    this.blocksPerColumn = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.selectedNumbers = [];

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

export default Game;
