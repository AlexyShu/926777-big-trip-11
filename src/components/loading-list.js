import AbstractComponent from "./abstract-component.js";

export default class LoadingListComponent extends AbstractComponent {
  getTemplate() {
    return (`<p class="trip-events__msg">Loading...</p>`);
  }
}
