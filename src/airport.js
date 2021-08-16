import Weather from "./weather";

export default class Airport {
  constructor(capacity = 20) {
    this.capacity = capacity;
    this.gates = [];
    this.weather = new Weather();
  }

  land(flight) {
    if (this.isStormy()) {
      throw new Error("Conditions are stormy: Flight cannot land");
    }
    if (this.isFull()) {
      throw new Error("Airport gates are full");
    }
    if (flight.isFlying != true) {
      throw new Error("Flight is not in the air");
    }

    this.gates.push(flight);
  }

  takeOff(flight) {
    if (flight.isFlying === true) {
      throw new Error("Flight is already in the air");
    }
    if (!this.gates.includes(flight)) {
      throw new Error("Flight is not at this airport");
    }
    if (this.isStormy()) {
      throw new Error("Conditions are stormy: Flight cannot take off");
    }

    flight.isFlying = true;
    let index = this.gates.indexOf(flight);
    this.gates.splice(index, 1);
  }

  isStormy() {
    return this.weather.conditions() === "Stormy";
  }

  isFull() {
    return this.gates.length === this.capacity;
  }
}
