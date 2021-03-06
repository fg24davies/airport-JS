jest.mock("../src/weather");
jest.mock("../src/flight");
import Airport from "../src/airport";
import Flight from "../src/flight";
import Weather from "../src/weather";

describe("Airport", () => {
  let airport1, airport2, flight;

  beforeEach(() => {
    airport1 = new Airport();
    airport2 = new Airport();
    //flight = new Flight(airport1);
    Weather.mockClear();
    Flight.mockClear();
    Flight.mockImplementation(() => ({
      departure: airport1,
      isFlying: false,
    }));
    flight = new Flight(airport1);
    airport1.gates.push(flight);
    console.log("flight instance:", flight);
    //console.log("weather conditions", Weather.conditions);
  });

  test("can land a flight", () => {
    airport1.takeOff(flight);
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
    airport1.takeOff(flight);
    let smallAirport = new Airport(1);
    let flight3 = new Flight(smallAirport);
    smallAirport.gates.push(flight3); // because my mock Flight mock isn't working correctly I have to add this line here to make the flight go into the airport
    expect(() => {
      smallAirport.land(flight);
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
    mockConditions.mockReset();
  });

  test("cannot takeoff a flight in stormy weather", () => {
    const mockConditions = jest.fn();
    Weather.prototype.conditions = mockConditions;
    mockConditions.mockReturnValue("Stormy");
    let stormyAirport = new Airport(); // this has to be after the mocking because new Weather is instantiated when Airport is instantiated
    let stormyFlight = new Flight(stormyAirport);
    stormyAirport.gates.push(stormyFlight); // because my mock Flight mock isn't working correctly I have to add this line here to make the flight go into the airport
    expect(() => {
      stormyAirport.takeOff(stormyFlight);
    }).toThrowError("Conditions are stormy: Flight cannot take off");
    mockConditions.mockReset();
  });

  test("cannot take off a flight that is already in the air", () => {
    airport1.takeOff(flight); // take off flight
    expect(flight.isFlying).toEqual(true);
    expect(() => {
      airport1.takeOff(flight);
    }).toThrowError("Flight is already in the air"); //throw error exception has to be in a callback in Jest otherwise error will not be caught and assertion will fail
  });

  test("cannot land a flight that is not in the air", () => {
    expect(() => {
      airport2.land(flight);
    }).toThrowError("Flight is not in the air"); //throw error exception has to be in a callback in Jest otherwise error will not be caught and assertion will fail
  });

  test("cannot take off a flight that is not in that airport", () => {
    expect(() => {
      airport2.takeOff(flight);
    }).toThrowError("Flight is not at this airport");
  });
});
