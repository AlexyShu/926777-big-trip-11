import {months} from '../mocks/trip-info.js';
import AbstractComponent from "./abstract-component.js";


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

export default class TripDayComponent extends AbstractComponent {
  constructor(cards, dayCount) {
    super();
    this._cards = cards;
    this._dayCount = dayCount;
  }
  getTemplate() {
    return createTripDayItemTemplate(this._cards, this._dayCount);
  }
}
