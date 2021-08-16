import Airport from "./airport";

export default class Flight {
  constructor(departure = new Airport()) {
    this.departure = departure;
    departure.gates.push(this);
    this.isFlying = false;
  }
}
