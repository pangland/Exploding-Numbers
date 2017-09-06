const Util = {
  // inherits (childClass, parentClass) {
  //   function Surrogate () {}
  //   Surrogate.prototype = parentClass.prototype;
  //   childClass.prototype = new Surrogate();
  //   childClass.prototype.constructor = childClass;
  // },

  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  }
};

module.exports = Util;
