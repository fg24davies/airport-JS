import Airport from "./airport";

export default class Flight {
  constructor(departure = new Airport()) {
    this.departure = departure;
    console.log(this.departure);
    departure.gates.push(this);
    this.inFlight = false;
  }
}
