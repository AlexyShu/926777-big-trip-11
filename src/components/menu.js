import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = (menuPoints) => {
  return (`<nav class="trip-controls__trip-tabs trip-tabs">
  ${menuPoints.map(({name, isActive}) => {
      return `<a class="trip-tabs__btn ${isActive ? `trip-tabs__btn--active` : ``}" href="#">${name}</a>`;
    }).join(`\n`)}
  </nav>`
  );
};

export default class SiteMenuComponent extends AbstractComponent {
  constructor(eventSorts) {
    super();
    this._eventSorts = eventSorts;
  }
  getTemplate() {
    return createMenuTemplate(this._eventSorts);
  }
}
