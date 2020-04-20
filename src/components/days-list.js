import AbstractComponent from "./abstract-component.js";

export default class TripDaysListComponent extends AbstractComponent {
  getTemplate() {
    return (`<ul class="trip-days"></ul>`);
  }
}
