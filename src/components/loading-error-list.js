import AbstractComponent from "./abstract-component.js";

export default class LoadingErrorList extends AbstractComponent {
  getTemplate() {
    return (
      `<p class="trip-events__msg">Oh... NO! 😳 Loading error! Please try again later</p>`
    );
  }
}
