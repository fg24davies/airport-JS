// import Airport from "../src/airport";
import Flight from "../src/flight";
//jest.mock("../src/airport");

describe("Flight", () => {
  let flight = new Flight();

  test("is not airborne when created", () => {
    expect(flight.isFlying).toEqual(false);
  });
});
