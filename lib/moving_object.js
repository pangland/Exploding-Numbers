/*
Base class for anything that moves.

Most important methods are MovingObject.prototype.move,
MovingObject.prototype.draw(ctx),
MovingObject.prototype.isCollidedWith(otherMovingObject).
*/
class MovingObject {
  constructor(properties) {
    this.pos = properties.pos;
    this.vel = properties.vel;
    this.color = properties.color;
    this.radius = properties.radius;

    this.draw = this.draw.bind(this);
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos[0], this.pos[1], 500, 500);
  }

  move() {
    this.pos[1] = this.pos[0] + this.vel;
  }
}

// module.exports = MovingObject;
export default MovingObject;


// function MovingObject (properties) {
//   // { pos: [30, 30], vel: [10, 10], radius: 5, color: "#00FF00"}
//   this.pos = properties.pos;
//   this.vel = properties.vel;
//   this.color = properties.color;
//   this.radius = properties.radius;
// }
//
// MovingObject.prototype.draw = function (ctx) {
//   ctx.fillSyle = this.color;
//   ctx.beginPath();
//
//   ctx.arc(
//     this.pos[0],
//     this.pos[1],
//     this.radius,
//     0,
//     2 * Math.PI,
//     false
//   );
//
//   ctx.fill();
// };
//
// MovingObject.prototype.move = function () {
//   this.pos[0] = this.pos[0] + this.vel[0];
//   this.pos[1] = this.pos[1] + this.vel[1];
// };
//
// module.exports = MovingObject;
