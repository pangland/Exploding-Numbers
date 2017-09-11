import Game from 'game.js';

class Equations {
  constructor() {
    this.equationCount = 0;
    this.operations = ['+', '-', '*', '%'];
    this.equation = "";
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.fillText(this.number, 450, 25);
  }

  generateNewEquation(numberArray) {
    this.equationCount++;
    const solution = parseInt(numberArray.join(','));
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
      case '%':
        this.divide(solution);
        break;
    }
  }

  add(solution) {
    const firstValue = Math.floor(Math.random() * solution);
    const secondValue = solution - firstValue;
    this.equation = `${firstValue} + ${solution}`;
  }

  subtract(solution) {
    const firstValue = Math.floor(Math.random() * 10 * this.equaitonCount);
    const secondValue = firstValue - solution;
    this.equation = `${firstValue} - ${secondValue}`;
  }

  multiply(solution) {
    const factors = [];
    for (let i = 0; i <= solution / 2; i++) {
      if (solution % i === 0) {
        factors.push(i);
      }
    }

    const firstValue = factors[Math.floor(Math.random() * factors.length())];
    const secondValue = solution / firstValue;
    this.equation = `${firstValue} * ${secondValue}`;
  }

  divide(solution) {
    const firstValue = solution * Math
      .floor(Math.random() * 10 * this.equationCount) + 1;
    const secondValue = firstValue / solution;
    this.equation = `${firstValue} % ${secondValue}`;
  }
}
