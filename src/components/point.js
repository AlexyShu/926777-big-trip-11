import {timeFormat, dateFormat, calculateTimeInterval, getPrepositionForEventType, getUpperCaseString} from "../utils/common.js";
import AbstractComponent from "./abstract-component.js";

const createOffersTemplate = (offers) => {
  return (`<ul class="event__selected-offers">
    ${offers.map(({title, price}) => {
      return `<li class="event__offer">
                  <span class="event__offer-title">${title}</span>
                   &plus;
                   &euro;&nbsp;<span class="event__offer-price">${price}</span>
                </li>`;
    }).slice(0, 3).join(`\n`)}
    </ul>`
  );
};

const createCardTemplate = (point) => {
  const {eventType, startEventTime, endEventTime, price} = point;
  const {name} = point.destination;
  const preposition = getPrepositionForEventType(eventType);
  return (`<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${eventType}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${getUpperCaseString(eventType)} ${preposition} ${name}</h3>
        <div class="event__schedule">
          <p class="event__time">
          <time class="event__start-time" datetime="${dateFormat(startEventTime)}">${timeFormat(startEventTime)}</time>
          &mdash;
          <time class="event__end-time" datetime="${dateFormat(endEventTime)}">${timeFormat(endEventTime)}</time>
        </p>
        <p class="event__duration">${calculateTimeInterval(startEventTime, endEventTime)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value"> ${price} </span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        ${createOffersTemplate(point.offers)}
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class Point extends AbstractComponent {
  constructor(card) {
    super();
    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setRollupButtonHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, handler);
  }
}
