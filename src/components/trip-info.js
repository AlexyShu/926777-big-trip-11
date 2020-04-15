import {cities} from '../mocks/event.js';
import {months} from '../mocks/trip-info.js';
import {getRandomArrayItem, createElement} from '../utils.js';

const createTripInfoTemplate = (events) => {
  const startRouteDate = new Date(events[0].startDate);
  // const endRouteDate = new Date(cards[cards.length - 1].startDate);
  return (`<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${getRandomArrayItem(cities)} &mdash; ${getRandomArrayItem(cities)} &mdash; ${getRandomArrayItem(cities)}</h>
         <p class="trip-info__dates"> ${startRouteDate.getDate()}&nbsp;${months[startRouteDate.getMonth()]}&nbsp;&mdash;&nbsp;</p>
      </div>
       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
      </p>
    </section>`
  );
};

export default class TripInfoComponent {
  constructor(cards) {
    this._element = null;
    this._cards = cards;
  }
  getTemplate() {
    return createTripInfoTemplate(this._cards);
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
