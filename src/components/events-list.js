import AbstractComponent from "./abstract-component.js";

export default class EventListComponent extends AbstractComponent {
  getTemplate() {
    return (`<ul class="trip-events__list">
    </ul>`
    );
  }
}
