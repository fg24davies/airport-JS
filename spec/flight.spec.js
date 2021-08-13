const Airport = require("../src/airport");
const Flight = require("../src/flight");

describe("Flight", () => {
  beforeEach(() => {
    airport = new Airport();
    flight = new Flight("EJY1");
  });

  // test.skip("can land at an airport", () => {
  //   flight.landAt(airport);
  //   console.log(airport.gates[0]);
  //   expect(airport.gates[0]).toEqual(flight);
  // });

  // test("takes off from and is no longer at airport", () => {
  //   console.log(airport.gates);
  //   flight.takeOffFrom(airport);
  //   console.log(airport.gates);
  //   expect(airport.gates.includes(flight)).toEqual(false);
  // });
});
