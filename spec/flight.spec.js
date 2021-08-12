const Airport = require("../src/airport");
const Flight = require("../src/flight");

describe("Airport", () => {
  beforeEach(() => {
    airport = new Airport("Stansted");
    flight = new Flight("EJY1");
  });

  test("it lands a flight", () => {
    flight.landAt(airport);
    console.log(airport.gates[0]);
    expect(airport.gates[0]).toEqual(flight);
  });
});
