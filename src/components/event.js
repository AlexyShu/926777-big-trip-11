import {getTimeFormat, getDateFormat, calculateTimeInterval, createElement} from '../utils.js';

const createOffersTemplate = (offers) => {
  return (`<ul class="event__selected-offers">
    ${offers.map(({name, price}) => {
      return `<li class="event__offer">
                  <span class="event__offer-title">${name}</span>
                   &plus;
                   &euro;&nbsp;<span class="event__offer-price">${price}</span>
                </li>`;
    }).join(`\n`)}
    </ul>`
  );
};

const createCardTemplate = (event) => {
  const {type, city, price, startDate, endDate, offers, course} = event;
  return (`<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${course} ${city}</h3>
        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${getDateFormat(startDate)}T${getTimeFormat(startDate)}">${getTimeFormat(startDate)}</time>
          &mdash;
          <time class="event__end-time" datetime="${getDateFormat(endDate)}T${getTimeFormat(endDate)}">${getTimeFormat(endDate)}</time>
        </p>
        <p class="event__duration">${calculateTimeInterval(startDate, endDate)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value"> ${price} </span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createOffersTemplate(offers)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class CardComponent {
  constructor(card) {
    this._element = null;
    this._card = card;
  }
  getTemplate() {
    return createCardTemplate(this._card);
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
