import {cards} from '../mocks/event.js';
import {getTimeFormat, getRandomIntegerNumber, getRandomArrayItem} from '../utils.js';

export const createCardTemplate = () => {
  const card = getRandomArrayItem(cards);
  const timestamp = new Date().getTime() / 1000;
  const startDate = (timestamp - getRandomIntegerNumber(1000, 300000)) * 1000;
  const endDate = (timestamp - getRandomIntegerNumber(1000, 300000)) * 1000 + (getRandomIntegerNumber(1000, 300000)) * 1000;
  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${card.type.icon}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${card.type.name} ${card.town}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="2019-03-18T10:30">${getTimeFormat(startDate)}</time>
            &mdash;
            <time class="event__end-time" datetime="2019-03-18T11:00">${getTimeFormat(endDate)}</time>
          </p>
          <p class="event__duration">30M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value"> ${card.price} </span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          <li class="event__offer">
            <span class="event__offer-title"> ${card.offer.name}</span>
            &plus;
            &euro;&nbsp;<span class="event__offer-price">${card.offer.price}</span>
           </li>
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
