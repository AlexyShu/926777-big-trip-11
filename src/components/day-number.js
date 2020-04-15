import {months} from '../mocks/trip-info.js';
import {createElement} from "../utils";

const createTripDayItemTemplate = (events) => {
  const startRouteDate = new Date(events[0].startDate);
  return (`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"> ${startRouteDate.getDate()} </span>
        <time class="day__date" datetime="2019-03-18"> ${months[startRouteDate.getMonth()]} ${startRouteDate.getFullYear()}</time>
      </div>
    </li>`
  );
};

export default class TripDayItemComponent {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }
  getTemplate() {
    return createTripDayItemTemplate(this._cards);
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
