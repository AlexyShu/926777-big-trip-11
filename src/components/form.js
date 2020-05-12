import {doFirstLetterUppercase, getRandomArrayItem, Mode} from '../utils/common.js';
import {cities, types, descriptions, createOffers} from '../mocks/event.js';
import AbstractSmartComponent from "./abstract-smart-component.js";
import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const createPicturesTemplate = (pics) => {
  return pics.map((picture) => `<img class="event__photo" src="${picture}" alt="Event photo"></img>`).join(`\n`);
};

const createOffersTemplate = (offers) => {
  return (`<div class="event__available-offers">
  ${offers.map(({name, price, type, isChecked, id}) => {
      return `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-${id}" type="checkbox" name="event-offer-${type}" ${isChecked ? `checked` : ``}>
      <label class="event__offer-label" for="event-offer-${type}-${id}">
      <span class="event__offer-title"> ${name} </span>
      &plus;
     &euro;&nbsp;<span class="event__offer-price">${price}</span>
     </label>
   </div>`;
    }).join(`\n`)}
  </div>`
  );
};

const createCitySelectTemplate = (places) => {
  return (`<datalist id="destination-list-1">
  ${places.map((it) => {
      return `<option value="${it}"></option>`;
    }).join(`\n`)}
    </datalist>`
  );
};

const createFormTemplate = (event) => {
  const {type, description, city, startDate, endDate, price, offers, course, isFavorite} = event;
  const picturesTemplate = createPicturesTemplate(event.pictures);
  return (`<form class="trip-events__item  event  event--edit" action="#" method="post">
      <header class="event__header">
           <div class="event__type-wrapper">
             <label class="event__type  event__type-btn" for="event-type-toggle-1">
               <span class="visually-hidden">Choose event type</span>
               <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
             </label>
             <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
             <div class="event__type-list">
             ${Object.keys(types).map((group) => {
      return (`<fieldset class="event__type-group">
                  <legend class="visually-hidden">${types[group]}</legend>
                ${types[group].map((el) => {
          return (`<div class="event__type-item">
                      <input id="event-type-${el}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${el}" ${type === el && `checked`}>
                      <label class="event__type-label  event__type-label--${el}" for="event-type-${el}-1">${doFirstLetterUppercase(el)}</label>
                    </div>`
          );
        }).join(`\n`)}
                </fieldset>`
      );
    }).join(`\n`)}
         </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
           <label class="event__label  event__type-output" for="event-destination-1">
           ${type} ${course}
           </label>
           <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${city}" list="destination-list-1">
           ${createCitySelectTemplate(cities)}
        </div>
        <div class="event__field-group  event__field-group--time">
           <label class="visually-hidden" for="event-start-time-1">
           From
           </label>
           <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startDate}">
           &mdash;
           <label class="visually-hidden" for="event-end-time-1">
           To
           </label>
           <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endDate}">
        </div>
        <div class="event__field-group  event__field-group--price">
           <label class="event__label" for="event-price-1">
           <span class="visually-hidden">Price</span>
           &euro;
           </label>
           <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <input id="event-favorite-1" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite" ${isFavorite ? `checked` : ``}>
        <label class="event__favorite-btn" for="event-favorite-1">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
             <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
           </svg>
         </label>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
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


const parseFormData = (formData, type, offers, pictures, course) => {
  const offersChecked = offers.filter((offer) => offer.isChecked === true);
  return {
    type,
    pictures,
    course,
    offers: offersChecked,
    city: formData.get(`event-destination`),
    startDate: flatpickr.parseDate(formData.get(`event-start-time`), `d/m/y H:i`),
    endDate: flatpickr.parseDate(formData.get(`event-end-time`), `d/m/y H:i`),
    price: formData.get(`event-price`),
    isFavorite: false
  };
};

export default class EventFormComponent extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._flatpickrStartDate = null;
    this._flatpickrEndDate = null;
    this._rollupHandler = null;
    this._resetHandler = null;
    this._submitHandler = null;
    this._mode = Mode.DEFAULT;
    this._type = card.type;

    this._applyFlatpickr();
    this.addListeners();
  }

  getTemplate() {
    return createFormTemplate(this._card);
  }

  removeElement() {
    this._deleteFlatpickrs();
    super.removeElement();
  }

  rerender() {
    super.rerender();
    this._applyFlatpickr();
  }

  _deleteFlatpickrs() {
    if (this._flatpickrStartDate && this._flatpickrEndDate) {
      this._flatpickrStartDate.destroy();
      this._flatpickrStartDate = null;
      this._flatpickrEndDate.destroy();
      this._flatpickrEndDate = null;
    }
  }

  _applyFlatpickr() {
    this._deleteFlatpickrs();

    this._flatpickrStartDate = this._setFlatpickr(this.getElement().querySelector(`#event-start-time-1`), this._card.startDate);
    this._flatpickrEndDate = this._setFlatpickr(this.getElement().querySelector(`#event-end-time-1`), this._card.endDate, this._card.startDate);
  }

  _setFlatpickr(input, defaultTime, dateMin = `today`) {
    return flatpickr(input, {
      enableTime: true,
      dateFormat: `d/m/y H:i`,
      minDate: dateMin,
      defaultDate: defaultTime,
      allowInput: true,
    });
  }

  setRpllupFormButtonClick(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
    .addEventListener(`click`, handler);
    this._rollupHandler = handler;
  }

  setResetButtonHandler(handler) {
    this.getElement().querySelector(`.event__reset-btn`)
    .addEventListener(`click`, handler);
    this._resetHandler = handler;
  }

  setSubmitFormHandler(handler) {
    this.getElement().addEventListener(`submit`, handler);
    this._submitHandler = handler;
  }

  setFavotiteButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__favorite-btn`)
      .addEventListener(`click`, handler);
  }

  recoveryListeners() {
    this.setSubmitFormHandler(this._submitHandler);
    this.setResetButtonHandler(this._resetHandler);
    this.addListeners();

    if (this._mode === Mode.DEFAULT) {
      this.setResetButtonHandler(this._cancelHandler);
    }
  }

  addListeners() {
    const element = this.getElement();

    element.querySelectorAll(`.event__type-input`).forEach((it) => {
      it.addEventListener(`change`, (evt) => {
        this._card.type = evt.target.value;
        this._card.offers = createOffers(this._card.type);
        this.rerender();
      });
    });

    const eventInput = element.querySelector(`.event__input--destination`);
    eventInput.addEventListener(`change`, (evt) => {
      this._card.city = evt.target.value;
      this._card.description = getRandomArrayItem(descriptions);
      this.rerender();
    });
  }

  getData() {
    const form = this.getElement();
    const formData = new FormData(form);
    return parseFormData(formData, this._type, this._card.offers, this._card.pictures, this._card.course);
  }

}
