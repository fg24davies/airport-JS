const Airport = require("../src/airport");
const Flight = require("../src/flight");
const Weather = require("../src/weather");
jest.mock("../src/weather");

describe("Airport", () => {
  beforeEach(() => {
    airport1 = new Airport();
    airport2 = new Airport();
    flight = new Flight(airport1);
    Weather.mockClear();
    //console.log(flight);
  });

  test("can land at an airport", () => {
    airport2.land(flight);
    expect(airport2.gates.includes(flight)).toEqual(true);
  });

  test("can take off at an airport", () => {
    airport1.takeOff(flight);
    expect(airport1.gates.includes(flight)).toEqual(false);
  });

  test("all have default capacity of 20", () => {
    expect(airport1.capacity).toEqual(20);
  });

  test("airport's capacity can be overridden to 12", () => {
    airport = new Airport(12);
    expect(airport.capacity).toEqual(12);
  });

  test("plane cannot land when Airport is at capacity", () => {
    airport = new Airport(1);
    flight1 = new Flight(airport);
    expect(() => {
      airport.land(flight);
    }).toThrowError("Airport gates are full"); //throw error exception has to be in a callback in Jest otherwise error will not be caught and assertion will fail
  });

  test("cannot land a plane in stormy weather", () => {
    const mockConditions = jest.fn();
    Weather.prototype.conditions = mockConditions;
    mockConditions.mockReturnValue("Stormy");
    stormyAirport = new Airport(); // this has to be after the mocking because new Weather is instantiated when Airport is instantiated
    expect(() => {
      stormyAirport.land(flight);
    }).toThrowError("Conditions are stormy: Flight cannot land");
  });
});
