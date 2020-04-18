import {months} from '../mocks/trip-info.js';
import {createElement} from "../utils";


const createTripDayItemTemplate = (events) => {
  const startRouteDate = new Date(events[0].startDate);
  const day = startRouteDate.getDate();
  const month = months[startRouteDate.getMonth()];
  const year = startRouteDate.getFullYear();
  return (`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"> ${day} </span>
        <time class="day__date" datetime="${year}-${month}-${day}"> ${month} ${year}</time>
      </div>
    </li>`
  );
};

export default class TripDayComponent {
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
