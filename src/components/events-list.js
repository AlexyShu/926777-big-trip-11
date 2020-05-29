import AbstractComponent from "./abstract-component.js";

export default class EventsList extends AbstractComponent {
  getTemplate() {
    return (`<ul class="trip-events__list">
    </ul>`
    );
  }
}
