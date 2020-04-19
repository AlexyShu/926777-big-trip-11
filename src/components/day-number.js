import {months} from '../mocks/trip-info.js';
import {createElement} from "../utils";


const createTripDayItemTemplate = (events, dayCount) => {
  const startRouteDate = new Date(events[0].startDate);
  const day = startRouteDate.getDate();
  const month = months[startRouteDate.getMonth()];
  const year = startRouteDate.getFullYear();
  return (`<li class="trip-days__item  day">
      <div class="day__info">
        <span class="day__counter"> ${dayCount} </span>
        <time class="day__date" datetime="${year}-${month}-${day}"> ${month} ${day}</time>
      </div>
    </li>`
  );
};

export default class TripDayComponent {
  constructor(cards, dayCount) {
    this._element = null;
    this._cards = cards;
    this._dayCount = dayCount;
  }
  getTemplate() {
    return createTripDayItemTemplate(this._cards, this._dayCount);
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
