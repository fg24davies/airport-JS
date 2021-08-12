class Airport {
  constructor(name, capacity = 20) {
    this.name = name;
    this.capacity = capacity;
    this.gates = [];
  }
}

module.exports = Airport;
