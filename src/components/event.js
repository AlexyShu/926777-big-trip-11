import {getTimeFormat, getDateFormat, calculateTimeInterval} from '../utils.js';
import {createOffers} from '../mocks/event.js';

export const createCardTemplate = (event) => {
  const {type, town, price, startDate, endDate} = event;
  const items = createOffers(type.name);
  return (`
    <li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${type.name}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type.name} ${type.course} ${town}</h3>

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
        <ul class="event__selected-offers">
        ${items.map(({offerName, offerPrice}) => {
      return `<li class="event__offer">
                      <span class="event__offer-title">${offerName}</span>
                       &plus;
                       &euro;&nbsp;<span class="event__offer-price">${offerPrice}</span>
                    </li>`;
    }).join(`\n`)}
        </ul>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};
