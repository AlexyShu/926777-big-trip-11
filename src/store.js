export default class Store {
  constructor() {
    this._destinations = [];
    this._offers = [];
  }

  setDestinations(data) {
    this._destinations = data;
  }

  setOffers(data) {
    this._offers = data;
  }

  getDestinations() {
    return this._destinations;
  }

  getDestinationNames() {
    return [...new Set(this._destinations.map(({name}) => name))];
  }

  getOffers() {
    return this._offers;
  }
}
