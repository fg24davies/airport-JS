const Weather = require("../src/weather");

describe("Weather", () => {
  test("it returns 'Stormy' when random number is over 0.8", () => {
    weather = new Weather();
    jest.spyOn(Math, "random").mockReturnValue("0.9");
    expect(weather.conditions()).toEqual("Stormy");
  });

  test("it returns 'Clear' when random number is under 0.8", () => {
    weather = new Weather();
    jest.spyOn(Math, "random").mockReturnValue("0.1");
    expect(weather.conditions()).toEqual("Clear");
  });
});
