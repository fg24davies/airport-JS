const Airport = require("../src/airport");
const Flight = require("../src/flight");

describe("Airport", () => {
  beforeEach(() => {
    airport = new Airport("Stansted");
    flight = new Flight("EJY1");
  });
});
