const Airport = require("./airport");

class Flight {
  constructor(departure = new Airport(), arrival = new Airport()) {
    this.departure = departure;
    this.arrival = arrival;
    departure.gates.push(this);
    // this.inFlight = false;
  }
}

module.exports = Flight;
