import {cities} from '../mocks/event.js';
import {months} from '../mocks/trip-info.js';
import {getRandomArrayItem} from '../utils/common.js';
import AbstractComponent from "./abstract-component.js";

const createTripInfoTemplate = (events) => {
  const startRouteDate = new Date(events[0].startDate);
  const endRouteDate = new Date(events[events.length - 1].startDate);
  return (`<section class="trip-main__trip-info  trip-info">
       <div class="trip-info__main">
         <h1 class="trip-info__title">${getRandomArrayItem(cities)} &mdash; ${getRandomArrayItem(cities)} &mdash; ${getRandomArrayItem(cities)}</h>
         <p class="trip-info__dates"> ${startRouteDate.getDate()}&nbsp;${months[startRouteDate.getMonth()]}&nbsp;&mdash;&nbsp;${endRouteDate.getDate()}&nbsp;${months[endRouteDate.getMonth()]}</p>
      </div>
       <p class="trip-info__cost">
         Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
      </p>
    </section>`
  );
};

export default class TripInfoComponent extends AbstractComponent {
  constructor(cards) {
    super();
    this._cards = cards;
  }
  getTemplate() {
    return createTripInfoTemplate(this._cards);
  }
}
