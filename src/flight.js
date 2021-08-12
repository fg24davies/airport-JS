class Flight {
  constructor(number, departure, arrival) {
    this.number = number;
    this.departure = departure;
    this.arrival = arrival;
  }

  landAt(airport) {
    airport.gates.push(this);
  }
}

module.exports = Flight;
