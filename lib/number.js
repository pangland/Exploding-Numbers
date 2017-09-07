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
    ctx.font = '18pt Arial';
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], 100, 100);
    ctx.fillStyle = "black";
    ctx.fillText(this.number, this.pos[0] + 43, this.pos[1] + 60);
  }

  move() {
    this.pos[1] = this.pos[0] + this.vel;
  }

  randomVec(length) {
    return 5 * Math.random() * 10;
  }

  randomColor() {
    return colors[Math.floor(Math.random() * 10) % colors.length];
  }
}

export default Number;
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
