const Airport = require("../src/airport");
const Flight = require("../src/flight");

describe("Airport", () => {
  beforeEach(() => {
    airport1 = new Airport();
    airport2 = new Airport();
    flight = new Flight(airport1, airport2);
  });

  test("can land at an airport", () => {
    airport2.land(flight);
    expect(airport2.gates.includes(flight)).toEqual(true);
  });

  test("can take off at an airport", () => {
    console.log(airport1.gates);
    airport1.takeOff(flight);
    console.log(airport1.gates);
    expect(airport1.gates.includes(flight)).toEqual(false);
  });

  test("all have default capacity of 20", () => {
    expect(airport1.capacity).toEqual(20);
  });

  test("aiport's capacity can be overridden to 12", () => {
    airport = new Airport(12);
    expect(airport.capacity).toEqual(12);
  });
});
