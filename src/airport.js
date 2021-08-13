const Flight = require("./flight");
const Weather = require("./weather");

class Airport {
  constructor(capacity = 20) {
    this.capacity = capacity;
    this.gates = [];
    this.weather = new Weather();
  }

  land(flight) {
    console.log(this.weather.conditions());
    if (this.weather.conditions() === "Stormy") {
      throw new Error("Conditions are stormy: Flight cannot land");
    }

    if (this.isFull()) {
      throw new Error("Airport gates are full");
    } else {
      this.gates.push(flight);
    }
  }

  takeOff(flight) {
    let index = this.gates.indexOf(flight);
    this.gates.splice(index, 1);
  }

  isFull() {
    return this.gates.length === this.capacity;
  }
}

module.exports = Airport;
