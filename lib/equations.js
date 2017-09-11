class Equations {
  constructor() {
    this.equationCount = 0;
    this.operations = ['+', '-', '*', '%'];
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

    debugger
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
    debugger
    const firstValue = Math.floor(Math.random() * solution);
    const secondValue = solution - firstValue;
    this.equation = `${firstValue} + ${secondValue}`;
  }

  subtract(solution) {
    debugger
    const firstValue = Math.floor(Math.random() * 10 * this.equationCount + solution);
    const secondValue = firstValue - solution;
    this.equation = `${firstValue} - ${secondValue}`;
  }

  multiply(solution) {
    debugger
    const factors = [];
    for (let i = 1; i <= solution / 2; i++) {
      if (solution % i === 0) {
        factors.push(i);
      }
    }

    if (solution === 0) {
      const firstValue = factors[Math.floor(Math.random() * 10 * this.equaitonCount)];
      const secondValue = 0;
      this.equation = `${firstValue} * ${secondValue}`;
    } else {
      const firstValue = factors[Math.floor(Math.random() * factors.length)];
      const secondValue = solution / firstValue;
      this.equation = `${firstValue} * ${secondValue}`;
    }
  }

  divide(solution) {
    debugger
    const firstValue = solution * Math
      .floor(Math.random() * 10 * this.equationCount + 1);
    const secondValue = firstValue / solution;
    this.equation = `${firstValue} % ${secondValue}`;
  }
}

export default Equations;
