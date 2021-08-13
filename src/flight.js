const Airport = require("./airport");

class Flight {
  constructor(departure = new Airport()) {
    this.departure = departure;
    departure.gates.push(this);
    this.inFlight = false;
  }
}

module.exports = Flight;
