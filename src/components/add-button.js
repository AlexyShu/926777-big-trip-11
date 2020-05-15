import AbstractComponent from "./abstract-component.js";

export default class AddEventButton extends AbstractComponent {
  getTemplate() {
    return (
      `<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>`
    );
  }

  setClickButtonHandler(handler) {
    this.getElement().addEventListener(`click`, handler);
  }
}