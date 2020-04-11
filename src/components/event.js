import {getTimeFormat, getRandomIntegerNumber} from '../utils.js';
import {offers} from '../mocks/event.js';

const getOffer = (offer) => {
  const element = offers.find((it) => it.type === offer);
  if (element) {
    return `<li class="event__offer">
          <span class="event__offer-title">${element.name}</span>
           &plus;
           &euro;&nbsp;<span class="event__offer-price">${element.price}</span>
        </li>`;
  }
  return `<li class="event__offer"></li>`;
};

export const createCardTemplate = (event) => {
  const timestamp = new Date().getTime() / 1000;
  const startDate = (timestamp - getRandomIntegerNumber(1000, 300000)) * 1000;
  const endDate = (timestamp - getRandomIntegerNumber(1000, 300000)) * 1000 + (getRandomIntegerNumber(1000, 300000)) * 1000;
  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${event.type.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${event.type.name} ${event.town}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeFormat(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeFormat(endDate)}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value"> ${event.price} </span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${getOffer(event.type.icon)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
