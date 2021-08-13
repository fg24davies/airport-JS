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

  test("can land a flight", () => {
    airport2.land(flight);
    expect(airport2.gates.includes(flight)).toEqual(true);
  });

  test("can take off a flight", () => {
    airport1.takeOff(flight);
    expect(airport1.gates.includes(flight)).toEqual(false);
  });

  test("has default capacity of 20", () => {
    expect(airport1.capacity).toEqual(20);
  });

  test("capacity can be overridden", () => {
    airport = new Airport(12);
    expect(airport.capacity).toEqual(12);
  });

  test("cannot land flight when at capacity", () => {
    airport = new Airport(1);
    flight1 = new Flight(airport);
    expect(() => {
      airport.land(flight);
    }).toThrowError("Airport gates are full"); //throw error exception has to be in a callback in Jest otherwise error will not be caught and assertion will fail
  });

  test("cannot land a flight in stormy weather", () => {
    const mockConditions = jest.fn();
    Weather.prototype.conditions = mockConditions;
    mockConditions.mockReturnValue("Stormy");
    stormyAirport = new Airport(); // this has to be after the mocking because new Weather is instantiated when Airport is instantiated
    expect(() => {
      stormyAirport.land(flight);
    }).toThrowError("Conditions are stormy: Flight cannot land");
  });

  test("cannot takeoff a flight in stormy weather", () => {
    const mockConditions = jest.fn();
    Weather.prototype.conditions = mockConditions;
    mockConditions.mockReturnValue("Stormy");
    stormyAirport = new Airport(); // this has to be after the mocking because new Weather is instantiated when Airport is instantiated
    expect(() => {
      stormyAirport.takeOff(flight);
    }).toThrowError("Conditions are stormy: Flight cannot take off");
  });
});
