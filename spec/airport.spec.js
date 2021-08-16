import Airport from "../src/airport";
import Flight from "../src/flight";
import Weather from "../src/weather";
jest.mock("../src/weather");
//jest.mock("../src/flight");

describe("Airport", () => {
  const airport1 = new Airport();
  const airport2 = new Airport();
  const flight = new Flight(airport1);
  console.log("flight on creation is not flying:", flight.isFlying);
  Weather.mockClear();
  // Flight.mockClear()
  // console.log(flight);

  test("can land a flight", () => {
    airport2.land(flight);
    expect(airport2.gates.includes(flight)).toEqual(true);
  });

  test("can take off a flight", () => {
    airport1.takeOff(flight);
    expect(flight.isFlying).toEqual(true);
    expect(airport1.gates.includes(flight)).toEqual(false);
  });

  test("has default capacity of 20", () => {
    expect(airport1.capacity).toEqual(20);
  });

  test("capacity can be overridden", () => {
    let airport = new Airport(12);
    expect(airport.capacity).toEqual(12);
  });

  test("cannot land flight when at capacity", () => {
    let airport3 = new Airport(1);
    let flight3 = new Flight(airport3);
    expect(() => {
      airport3.land(flight);
    }).toThrowError("Airport gates are full"); //throw error exception has to be in a callback in Jest otherwise error will not be caught and assertion will fail
  });

  test("cannot land a flight in stormy weather", () => {
    const mockConditions = jest.fn();
    Weather.prototype.conditions = mockConditions;
    mockConditions.mockReturnValue("Stormy");
    let stormyAirport = new Airport(); // this has to be after the mocking because new Weather is instantiated when Airport is instantiated
    expect(() => {
      stormyAirport.land(flight);
    }).toThrowError("Conditions are stormy: Flight cannot land");
  });

  test("cannot takeoff a flight in stormy weather", () => {
    const mockConditions = jest.fn();
    Weather.prototype.conditions = mockConditions;
    mockConditions.mockReturnValue("Stormy");
    let stormyAirport = new Airport(); // this has to be after the mocking because new Weather is instantiated when Airport is instantiated
    expect(() => {
      stormyAirport.takeOff(flight);
    }).toThrowError("Conditions are stormy: Flight cannot take off");
  });

  test("cannot take off a flight that is already in the air", () => {
    const flight1 = new Flight(airport1); // new flight created at airport - not flying
    airport1.takeOff(flight1); // take off flight
    console.log("flight after takeoff is in the air:", flight1.isFlying); // should now be flying
    expect(flight.isFlying).toEqual(true);
    expect(() => {
      airport1.takeOff(flight1);
    }).toThrowError("Flight is already in the air"); //throw error exception has to be in a callback in Jest otherwise error will not be caught and assertion will fail
  });
});
