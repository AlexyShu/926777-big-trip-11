import {months} from '../mocks/trip-info.js';
import AbstractComponent from "./abstract-component.js";
import {dateFormat} from '../utils/common.js';

const createTripDayItemTemplate = (dayCount, startDate) => {
  let dayInfoTemplate = ``;
  if (dayCount > 0) {
    const startRouteDate = new Date(startDate);
    const day = startRouteDate.getDate();
    const month = months[startRouteDate.getMonth()];
    dayInfoTemplate = `<span class="day__counter"> ${dayCount} </span>
    <time class="day__date" datetime="${dateFormat(day)}"> ${month} ${day}</time>`;
  }
  return (`<li class="trip-days__item  day">
      <div class="day__info">
        ${dayInfoTemplate}
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
    return createTripDayItemTemplate(this._dayCount, this._cards[0].startDate);
  }
}
