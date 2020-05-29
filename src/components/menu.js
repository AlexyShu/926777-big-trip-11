import AbstractComponent from "./abstract-component.js";

const createMenuTemplate = () => {
  return (`<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn table trip-tabs__btn--active" href="#">Table</a>
    <a class="trip-tabs__btn statics" href="#">Stats</a>
  </nav>`
  );
};

export default class Menu extends AbstractComponent {
  getTemplate() {
    return createMenuTemplate();
  }

  setActiveTable() {
    this.getElement().querySelector(`.table`).classList.add(`trip-tabs__btn--active`);
    this.getElement().querySelector(`.statics`).classList.remove(`trip-tabs__btn--active`);
  }

  setActiveStatistics() {
    this.getElement().querySelector(`.table`).classList.remove(`trip-tabs__btn--active`);
    this.getElement().querySelector(`.statics`).classList.add(`trip-tabs__btn--active`);
  }

  setStatisticsButtonClickHandler(handler) {
    this.getElement().querySelector(`.statics`)
      .addEventListener(`click`, handler);
  }

  setTableButtonClickHandler(handler) {
    this.getElement().querySelector(`.table`)
      .addEventListener(`click`, handler);
  }
}


