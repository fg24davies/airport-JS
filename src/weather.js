export default class Weather {
  conditions() {
    return Math.random() > 0.8 ? "Stormy" : "Clear";
  }
}
