import {createElement} from "../utils";

const createMenuTemplate = (menuPoints) => {
  return (`<nav class="trip-controls__trip-tabs trip-tabs">
  ${menuPoints.map(({name, isActive}) => {
      return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
    }).join(`\n`)}
  </nav>`
  );
};

export default class SiteMenuComponent {
  constructor(eventSorts) {
    this._element = null;
    this._eventSorts = eventSorts;
  }
  getTemplate() {
    return createMenuTemplate(this._eventSorts);
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
