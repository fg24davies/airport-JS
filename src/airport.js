const Flight = require("./flight");

class Airport {
  constructor(capacity = 20) {
    this.capacity = capacity;
    this.gates = [];
  }

  land(flight) {
    this.gates.push(flight);
  }

  takeOff(flight) {
    let index = this.gates.indexOf(flight);
    this.gates.splice(index, 1);
  }
}

module.exports = Airport;
