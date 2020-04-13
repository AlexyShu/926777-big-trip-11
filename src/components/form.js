import {getDateFormat, getTimeFormat} from '../utils.js';
import {cities} from '../mocks/event.js';

const createPicturesTemplate = (pics) => {
  return pics.map((picture) => `<img class="event__photo" src="${picture}" alt="Event photo"></img>`).join(`\n`);
};

const createOffersTemplate = (items) => {
  return (
    `<div class="event__available-offers">
  ${items.map(({name, price, isChecked}) => {
      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-luggage-1">
      <span class="event__offer-title"> ${name} </span>
      &plus;
     &euro;&nbsp;<span class="event__offer-price">${price}</span>
     </label>
   </div>`;
    }).join(`\n`)}
  </div>`
  );
};

const chooseEventTypeTemplate = (items) => {
  return (
    `<div>
  ${items.map((it) => {
      return `<div class="event__type-item">
      <input id="event-type-${it}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${it}">
      <label class="event__type-label  event__type-label--${it}" for="event-type-${it}-1">${it}</label>
    </div>`;
    }).join(`\n`)}
  </div>`
  );
};

const chooseCityTemplate = (items) => {
  return (
    `<datalist id="destination-list-1">
  ${items.map((it) => {
      return `<option value="${it}"></option>`;
    }).join(`\n`)}
    </datalist>`
  );
};


export const createFormTemplate = (event) => {
  const {type, description, city, startDate, endDate, price, offers} = event;
  const picturesTemplate = createPicturesTemplate(event.pictures);
  const transfers = [`taxi`, `train`, `bus`, `ship`, `transport`, `drive`, `flight`];
  const activities = [`sightseeing`, `check-in`, `restaurant`];
  return (`
    <form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
           <div class="event__type-wrapper">
             <label class="event__type  event__type-btn" for="event-type-toggle-1">
               <span class="visually-hidden">Choose event type</span>
               <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
             </label>
             <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                ${chooseEventTypeTemplate(transfers)}
              </fieldset>
              <fieldset class="event__type-group">
                 <legend class="visually-hidden">Activity</legend>
                 ${chooseEventTypeTemplate(activities)}
              </fieldset>
           </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-1">
           ${type}
           </label>
           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
           ${chooseCityTemplate(cities)}
        </div>
        <div class="event__field-group  event__field-group--time">
           <label class="visually-hidden" for="event-start-time-1">
           From
           </label>
           <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${getDateFormat(startDate)} ${getTimeFormat(startDate)}">
           &mdash;
           <label class="visually-hidden" for="event-end-time-1">
           To
           </label>
           <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${getDateFormat(endDate)} ${getTimeFormat(endDate)}">
        </div>
        <div class="event__field-group  event__field-group--price">
           <label class="event__label" for="event-price-1">
           <span class="visually-hidden">Price</span>
           &euro;
           </label>
           <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          ${createOffersTemplate(offers)}
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${description}</p>
          <div class="event__photos-container">
             <div class="event__photos-tape">
             ${picturesTemplate}
             </div>
          </div>
        </section>
      </section>
    </form>`
  );
};
